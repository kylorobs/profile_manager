

import {store} from '../../app';
// import {edit} from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';
import { KeyMap } from '../../models/InputKeys';
import TextInput from './TextInput/TextInput';
import ImageUpload from './ImageUpload/ImageUpload';
import ButtonHandler from '../../models/ButtonHandler';

type Inputs = TextInput | ImageUpload;

class Form2 {
    private editid: string | null;
    private error: boolean;
    private formInputs: Inputs[];
    private formControls: HTMLDivElement;

    constructor(keyMappings: KeyMap[]){
        this.editid = store.getState().editing_id || null;
        this.error = false;
        
        //CREATE INPUTS, SEPARATING FILE INPUTS AND TEXT/SELECT INPUTS
        const inputs = keyMappings.map((map: KeyMap) =>{
            if (map.type === 'file') return new ImageUpload('fileinputs', false, map, 'url');
            else return new TextInput('textinputs', map);
        });
 
        this.formInputs = inputs;
        this.formControls = document.createElement('div');
        document.getElementById('textinputs')?.appendChild(this.formControls);
        
        this.configure();
        store.subscribe(this.configure);
    }

    @BindThis
    configure(){
        this.editid = store.getState().editing_id || null;
        if (this.editid) this.setValues();
        else this.clearForm();
        this.configureButtons();
    }

    @BindThis
    configureButtons(){
        this.formControls.innerHTML = '';
        const container = document.createElement('div');
        container.id = 'controls';
        container.innerHTML = '';
        const btnContainer = document.createElement('flex-container') as HTMLFlexContainerElement;
        btnContainer.innerHTML ='';
        btnContainer.wrap = true;

        const div = document.createElement('div');
        if (this.editid){
            div.innerHTML = `<kclsu-button small emitid="update"> Update </kclsu-button><kclsu-button purple small emitid="delete">Delete</kclsu-button>`;
            
            const top = document.createElement('flex-container') as HTMLFlexContainerElement;
            top.alignx = 'flex-end';
            top.innerHTML = '<kclsu-button verysmall center margin="4em" purple emitid="addNew">Switch to New Entry</kclsu-button>';
            document.getElementById('textinputs')?.prepend(top);
        } 
        else div.innerHTML = `<kclsu-button emitid="add" small center> Add Profile </kclsu-button>`
        
        btnContainer.appendChild(div);
        btnContainer.alignx = 'center';
        container.appendChild(btnContainer);
        this.formControls.appendChild(container)


        const btnHandler = ButtonHandler.getInstance();
        btnHandler.addEmitter('update', this.submitForm);
        btnHandler.addEmitter('add', this.submitForm);
        btnHandler.addEmitter('delete', this.deleteProfile);
        //NOTE: THIS BUTTON MUST APPEAR AS A DROPDOWN 
        btnHandler.addEmitter('addNew', this.clearForm);
    }

    @BindThis
    submitForm(){
        console.log('--- FORM2 --- Submit this terrible profile')
        this.validateValues();
    }

    @BindThis
    clearForm(){
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
        let inValid = false;
        const erstrings= [''];
        // const invalidProps = [];
        
        if (inValid) this.renderErrorMessages(erstrings)
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

    packageData(){
        // const profilePackage:Profile = {
        //     name: this.name.value,
        //     description: this.description.value,
        //     facebook: this.facebook.value,
        //     id: '43324',
        //     instagram: this.instagram.value,
        //     twitter: this.twitter.value,
        //     type: this.category.value,
        //     upcomingevent: this.upcomingevent.value,
        //     url: this.imageupload.value,
        //     website: this.website.value
        // }
        console.log('--- FORM2 --- Ready to send all of this data');
        // console.log(profilePackage)
    }



}

export default Form2;

