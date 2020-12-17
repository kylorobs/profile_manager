

import {store} from '../../app';
import { resetEditMode } from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';
import { KeyMap } from '../../models/InputKeys';
import TextInput from './TextInput/TextInput';
import ImageUpload from './ImageUpload/ImageUpload';
import FormControls from './FormControls/FormControls';
import Validator from './Validator/Validator';

type Inputs = TextInput | ImageUpload;

class Form2 {
    private editid: string | null;
    private error: boolean;
    private formInputs: Inputs[];

    constructor(keyMappings: KeyMap[]){
        this.editid = store.getState().editing_id || null;
        this.error = false;
        
        //CREATE INPUTS, SEPARATING FILE INPUTS AND TEXT/SELECT INPUTS
        const inputs = keyMappings.map((map: KeyMap) =>{
            if (map.type === 'file') return new ImageUpload('fileinputs', false, map, 'url');
            else return new TextInput('textinputs', map);
        });
        this.formInputs = inputs;
   
        this.configure();
        this.configureButtons();
        store.subscribe(this.configure);
        store.subscribe(this.reConfigureButtons);
    }

    @BindThis
    configure(){
        this.editid = store.getState().editing_id || null;
        if (this.editid) this.setValues();
        else this.clearForm();
    }

    @BindThis
    configureButtons(){
        //THIS WILL CREATE ALL BUTTONS INSIDE FORMCONTROLS CLASS
        // FORMCONTROLS WILL CONTROL WHICH BUTTONS GET RENDERED 
        const formControls = FormControls.getInstance(!!this.editid, 'textinputs');
        formControls.createButton('Update', false, 'update', 'update', this.submitForm);
        formControls.createButton('Create New', false, 'add', 'create', this.submitForm);
        formControls.createButton('Delete', true, 'delete', 'update', this.deleteProfile);
        formControls.createButton('Switch To New Entry Form', true, 'addNew', 'clear', this.clearForm);
        formControls.resetButtons();
    }

    @BindThis
    reConfigureButtons(){
        console.log('--- FORM CONTROLS edit value ----')
        console.log(this.editid)
        const formControls = FormControls.getInstance(!!this.editid, 'textinputs');
        formControls.resetButtons();
    }

    @BindThis
    submitForm(){
        console.log('--- FORM2 --- Submit this terrible profile')
        this.validateValues();
    }

    @BindThis
    clearForm(){
        this.editid = null;
        store.dispatch(resetEditMode)
        this.reConfigureButtons();
        this.formInputs
        .forEach((input: Inputs) => {
        if ('el' in input) input.el.value = '';
        else if ('imageurl' in input) input.setThumbnail('');
        else {
            console.log('failed to find type of input')
        }
    })

    }

    deleteProfile(){
        console.log('--- FORM2 --- Delete this terrible profile')
    }

    setValues(){
        const data = store.getState().profiles;
        const profile: Profile = data.filter((prof:Profile) => prof.id === this.editid)[0];
        const profileKeys: string[] = Object.keys(profile);
        console.log('------FORM 2 INPUTS -------');
        console.log(profile)
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
        console.log(this.error)
        // let inValid = false;
        // const erstrings= [''];
        
        // const invalidProps = [];
        const errors = this.formInputs
        .map((input: Inputs) => {
            if ('el' in input){
                return new Validator(input.el.value, input.keymap)
            } 
            else if ('imageurl' in input){
                return new Validator(input.imageurl, input.keymap)
            } 
            else throw new Error('issue');
        })
        console.log('FORM ERRORS')
        console.log(errors)
        
        // if (errors.find(er => er.isValid !== true)) this.renderErrorMessages(erstrings)
        if (errors.find(er => er.isValid !== true)) console.log('Error found!');
        else this.packageData()
    }

    renderErrorMessages(erstrings: string[]){
        const div = document.createElement('ul') as any;
        erstrings.forEach(str =>{
            const li = document.createElement('li');
            li.innerText = str
            div.appendChild(li)
        })
        div.classList.add('errorblock');
    }

    

    packageData():void {

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
        console.log('--- FORM2 --- Ready to send all of this data');
        console.log(profpackage)
    }

};

export default Form2;

