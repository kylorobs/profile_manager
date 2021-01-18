

import { store } from '../../app';
import { resetEditMode } from '../../state/FormSlice';
// import { updateProfile } from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';
import { KeyMap } from '../../models/InputKeys';
import TextInput from './TextInput/TextInput';
import UploadModal from './UploadModal/UploadModal';
import FormControls from './FormControls/FormControls';
import Validator from './Validator/Validator';
import ErrorModal from './ErrorModal/ErrorModal';
import * as thunks from '../../state/thunks/profile';
import Modal from '../Modal/modal';

type Inputs = TextInput | UploadModal;

class Form2 {
    private editid: string | null;
    private formInputs: Inputs[];
    private errorModal: ErrorModal; 
    private formControls: FormControls;
    private modal: Modal;

    constructor(keyMappings: KeyMap[]){
        this.editid = store.getState().form.editing_id || null;
        this.errorModal = new ErrorModal();
        //CREATE INPUTS, SEPARATING FILE INPUTS AND TEXT/SELECT INPUTS
        const inputs = keyMappings.map((map: KeyMap) =>{
            if (map.type === 'file') return new UploadModal('fileinputs', false, map, 'url');
            else return new TextInput('textinputs', map);
        });
        this.formInputs = inputs;
   
        this.formControls = new FormControls(!!this.editid, {
            update: () => this.submitForm('update'), 
            add: () => this.submitForm('add'),
            delete: this.deleteData,
            switch: this.swithToEmptyForm
        })
        this.modal = Modal.getInstance();
        this.configure();
        store.subscribe(this.configure);
    }

    @BindThis
    configure(){
        const editId = store.getState().form.editing_id;
        if (editId !== this.editid){
            this.editid = editId;
            if (editId) {
                this.setValues();
                this.formControls.toggleEditMode(true);
            }
            else {
                this.formControls.toggleEditMode(false)
            this.swithToEmptyForm();
            }
        }
    }


    @BindThis
    submitForm(type: 'add' | 'update'){
        const formErrors =  this.validateValues();
        formErrors.length >  0 ? this.errorModal.handleErrors(formErrors) : this.packageData(type);
    }

    @BindThis
    deleteData(){
        store.dispatch(thunks.deleteData({
            url: store.getState().data.dataUrl,
            id: this.editid,
        }))
        this.swithToEmptyForm();
    }


    @BindThis
    swithToEmptyForm(){
        this.editid = null;
        this.formControls.toggleEditMode(false);
        //store.dispatch(resetEditMode());
        this.formInputs
        .forEach((input: Inputs) => {
        if ('el' in input) input.el.value = '';
        else if ('imageurl' in input) input.setThumbnail('');
        else {
            console.log('failed to find type of input')
        }
    })

    }

    setValues(){
        const data = store.getState().data.profiles;
        const profile: Profile = data.filter((prof:Profile) => prof.id === this.editid)[0];
        const profileKeys: string[] = Object.keys(profile);
        this.formInputs
            .forEach((input: Inputs) => {
            const key = profileKeys.find((key: string) => key === input.title);
            if ('el' in input && key) input.el.value = profile[key];
            else if ('imageurl' in input && key) input.setThumbnail(profile[key]);
            else {
                console.log('failed to find type of input')
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
                else throw new Error('issue');
            })
            .filter((er: Validator)=> !er.isValid)
    }



    packageData(type: 'add' | 'update'):void {

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
                else console.log('failed to find type of input')
                
            })
        
        switch(type){
            case 'add' : 
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
                // store.dispatch(updateProfile({id: this.editid, data: profpackage}));
            break;
            default: console.log('Unknown button type');
        }

        store.dispatch(resetEditMode());
    }


    //FIRE 
    proceedWithConfirmation(fn: () => void){
        this.modal.exitModal();
        fn();
    }
};

export default Form2;

