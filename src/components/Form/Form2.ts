

import {store} from '../../app';
import {edit} from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';
import { KeyMap } from '../../models/InputKeys';
import TextInput from './TextInput/TextInput';


class Form {
    private editid: string | null;
    private error: boolean;
    private modal: HTMLKclsuModalElement;
    private formInputs: TextInput[];

    constructor(keyMappings: KeyMap[], categoryKey: string){
        this.editid = store.getState().editing_id || null;
        this.error = false;
        this.modal = document.querySelector('kclsu-modal')! as HTMLKclsuModalElement;
        document.addEventListener('exitModal', this.closeErrorModal);
        
        const inputs = keyMappings.map((map: KeyMap) =>{
            if (map.type === 'file') return new TextInput('textinput', map);
            if (map.keyName !== categoryKey) return new TextInput('textinput', map);
            else return new TextInput('textinput', map);
        });

        this.formInputs = inputs;
        
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
        const btnContainer = document.querySelector('form .profile flex-container')! as HTMLFlexContainerElement;
        btnContainer.innerHTML ='';

        const div = document.createElement('div');
        if(this.editid) div.innerHTML = `<kclsu-button small emitid="updatebaby"> Update </kclsu-button><kclsu-button purple small emitid="deletebaby">Delete</kclsu-button>`;
        else div.innerHTML = `<kclsu-button emitid="add" small center> Add Profile </kclsu-button>`
        btnContainer.appendChild(div);
        btnContainer.alignx = 'center';
        document.addEventListener('emitClick', (e:any) => this.clickHandler(e))
    }

    clickHandler(e:any){
        switch(e.detail){
            case 'update' : this.submitForm()
                break;
            case 'delete': this.deleteProfile()
                break;
            case 'add' : this.submitForm()
                break;
            case 'addNew' : store.dispatch(edit());
                break;
            default: console.log('button click error')
        }
    }

    submitForm(){
        this.validateValues();
    }

    clearForm(){
        console.log(this.error)

    }

    deleteProfile(){
        
    }

    setValues(){
        const data = store.getState().profiles;
        const profile: Profile = data.filter((prof:Profile) => prof.id === this.editid)[0];
        console.log(profile);
        const profileKeys: string[] = Object.keys(profile);
        console.log('------FORM INPUTS -------');
        this.formInputs.forEach((input: TextInput) => {
            const key = profileKeys.find((key: string) => key === input.title);
            if (key) input.el.value = profile[key];
        })

        // this.name.value = profile.name;
        // this.image.innerHTML = `<lazy-image image=${profile.url}></lzy-image>`
        // console.log(profile.url)
        // this.category.value = profile.type;
        // this.description.value = profile.description;
        // this.instagram.value = profile.instagram;
        // this.facebook.value = profile.facebook;
        // this.twitter.value = profile.twitter;
        // this.upcomingevent.value = profile.upcomingevent;
        // this.website.value = profile.website;
    }

    @BindThis
    validateValues(){
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
        this.modal.append(div);
        this.modal.show = true;
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
        console.log('ready to send');
        // console.log(profilePackage)
    }

    @BindThis
    closeErrorModal(){
        this.modal.innerHTML = '';
        this.modal.show = false;
    }


}

export default Form;