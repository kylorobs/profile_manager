

import { store } from '../../app';
import { resetEditMode } from '../../state/FormSlice';
// import { updateProfile } from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';
import { KeyMap } from '../../models/InputKeys';
import TextInput from './TextInput/TextInput';
import FileInput from './FileInput/FileInput';
import FormControls from './FormControls/FormControls';
import Validator from './Validator/Validator';
import FormErrorModal from '../Modal/FormErrorModal/FormErrorModal';
import * as thunks from '../../state/thunks/profile';
import Modal from '../Modal/Modal';
import { loading } from '../../state/ProfileSlice';

type Inputs = TextInput | FileInput;

class Form2 {
    private editid: string | null;
    private formInputs: Inputs[];
    private errorModal: FormErrorModal; 
    private formControls: FormControls;
    private submitModal: Modal;
    private loading: boolean;

    constructor(keyMappings: KeyMap[]){
        this.editid = store.getState().form.editing_id || null;
        this.errorModal = new FormErrorModal();
        this.loading = false;
        const containsFileInputs = keyMappings.find(map => map.type === 'document_file' || map.type === 'image_file' );
        
        // If there are no Image or Document file types, adjust layout
        if (!containsFileInputs){
            this.adjustFormLayout();
        }

        // Create input classes, separating file inputs and text/select inputs
        const inputs = keyMappings.map((map: KeyMap) =>{
            if (map.type === 'document_file' || map.type === 'image_file' ) return new FileInput('fileinputs', false, map, map.keyName);
            else return new TextInput('textinputs', map);
        });

        this.formInputs = inputs;
   
        // Supply the handler functions which will allow the FormControls to update form state 
        this.formControls = new FormControls(!!this.editid, {
            update: () => this.submitForm('update'), 
            add: () => this.submitForm('add'),
            delete: this.deleteData,
            switch: this.handleSwitchToEmptyForm
        })

        this.submitModal = new Modal();
        this.setEditingState();
        store.subscribe(this.setEditingState);
    }

    // Check for an editID or Loading boolean in global state. 
    // Set values if editId exists
    @BindThis
    private setEditingState(): void{
        const editId = store.getState().form.editing_id;
        const loading = store.getState().data.loading;
        const editingNew = store.getState().form.editing_new;
        console.log(editId !== this.editid)
        console.log(!!editId);
        const oldId = this.editid;
        
        if (this.loading !== loading) this.loading = loading;
        else if (editId !== oldId){
            this.editid = editId;
            if (!!editId) {
                this.setValues();
                this.formControls.toggleEditMode(true);
            }
            else if (oldId && editingNew) this.swithToEmptyForm();
        }
    }

    // Adjust styles of Div Elements contained within form
    private adjustFormLayout(): void{
        const filesColumn = document.querySelector('#fileinputs')! as HTMLDivElement;
        const textColumn = document.querySelector('#textinputs')! as HTMLDivElement;
        filesColumn.style.display = 'none';
        // Make column full width
        textColumn.style.width = '100%';
        textColumn.style.maxWidth = '800px';
        textColumn.style.margin = 'auto';
    }

    //Submit the form. We could either be adding a new entry, or updating an existing one
    @BindThis
    submitForm(type: 'add' | 'update'){
        const formErrors = this.validateValues();
        formErrors.length >  0 ? this.errorModal.handleErrors(formErrors) : this.packageData(type);
    }

    @BindThis
    deleteData(){
        this.proceedWithConfirmation();
        store.dispatch(thunks.deleteData({
            url: store.getState().data.dataUrl,
            id: this.editid,
        }))
        // this.swithToEmptyForm();
    }

    @BindThis
    handleSwitchToEmptyForm(){
        store.dispatch(resetEditMode());
    }

    //We want a blank form, ready for a new entry
    @BindThis
    swithToEmptyForm(): void {
        console.log('I am switching to an empoty form')
        //Reset editing global state
        this.editid = null;
        this.formControls.toggleEditMode(false);
        console.log('reset editing form inside Switch To Empty Form');
        // store.dispatch(resetEditMode());
        // Clear all form inputs
        this.formInputs
        .forEach((input: Inputs) => {
            if ('el' in input) input.el.value = '';
            else if ('imageurl' in input) input.updateImageUrl('');
            else {
                console.log('failed to find type of input')
            }
    })


    }

    setValues(): void{
        const data = store.getState().data.profiles;

        //Fetch profile with matching ID
        const profile: Profile = data.filter((prof:Profile) => prof.id === this.editid)[0];
        console.log(profile)
        //Pull all object keys from profile
        const profileKeys: string[] = Object.keys(profile);
        
        // For each input, find matching key name
        // If a text / select input, set the value property
        // If a file input, invoke the update function for that component
        this.formInputs
            .forEach((input: Inputs) => {
            const key = profileKeys.find((key: string) => key === input.title);
            if ('el' in input && key) input.el.value = profile[key];
            else if ('imageurl' in input && key) input.updateImageUrl(profile[key]);
            else {
                console.log('failed to find type of input: ' + input);
                console.log(input)
                console.log(key)
                //We need to show Error Modal. On 'Proceed' we create a NEW input and set state to 'AllowedNewInput'
            }
        })
    }


    @BindThis
    validateValues(){
        return this.formInputs
            .map((input: Inputs) => {
                if ('el' in input){
                    return new Validator(input.el.value, input.keymap)
                } 
                else if ('imageurl' in input){
                    return new Validator(input.imageurl, input.keymap)
                } 
                else throw new Error('issue'); //Show Error Modal
            })
            .filter((er: Validator)=> !er.isValid)
    }



    private packageData(type: 'add' | 'update'):void {
        
        this.proceedWithConfirmation();
        const profpackage: Profile = {};

        this.formInputs
            .forEach((input: Inputs) => {
                if ('el' in input){
                    console.log(input)
                    profpackage[input.title] = input.el.value;
                } 
                else if ('imageurl' in input){
                    profpackage[input.title] = input.imageurl;
                } 
                else {
                    console.log(input)
                    console.log('failed to find type of input')
                }
                
            })
        
        switch(type){
            case 'add' : 
                console.log('ADDING')
                store.dispatch(thunks.addData({
                    url: store.getState().data.dataUrl,
                    data: profpackage
                }));
            break;
            case 'update':
                store.dispatch(thunks.updateData({
                    url: store.getState().data.dataUrl,
                    id: this.editid,
                    data: profpackage
                }))
            break;
            default: console.log('Unknown button type');
        }


    }

    @BindThis
    public checkForLoadingState(): void{
        const loadingState = store.getState().data.loading;
        if (loadingState) this.submitModal.showSpinner();
        else if (!loadingState && this.submitModal.active) this.submitModal.exitModal()
    }

    //FIRE 
    proceedWithConfirmation(){
        store.dispatch(loading())
    }
};

export default Form2;

