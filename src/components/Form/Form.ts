
// import {Categories} from '../../types/types';
import {store} from '../../app';
import {edit} from '../../state/ProfileSlice';
import {BindThis} from '../../decorators/bindthis';
import {Profile} from '../../models/Profile';

class Form {
    private category: HTMLSelectElement;
    private name: HTMLInputElement;
    private description: HTMLTextAreaElement;
    private instagram: HTMLInputElement;
    private facebook: HTMLInputElement;
    private twitter: HTMLInputElement;
    private website: HTMLInputElement;
    private upcomingevent: HTMLInputElement;
    private imageupload: HTMLInputElement;
    private image: HTMLDivElement;
    private id: HTMLInputElement;
    private editid: string | null;
    private error: boolean;

    constructor(){
        this.category = document.getElementById('category')! as HTMLSelectElement;
        this.name = document.getElementById('name')! as HTMLInputElement;
        this.description = document.getElementById('description')! as HTMLTextAreaElement;
        this.instagram = document.getElementById('instagram')! as HTMLInputElement;
        this.facebook = document.getElementById('facebook')! as HTMLInputElement;
        this.twitter = document.getElementById('twitter')! as HTMLInputElement;
        this.website = document.getElementById('website')! as HTMLInputElement;
        this.upcomingevent = document.getElementById('upcomingevent')! as HTMLInputElement;
        this.imageupload = document.getElementById('imageupload')! as HTMLInputElement;
        // this.image = document.querySelector('.profile lazy-image')! as HTMLLazyImageElement
        this.image = document.getElementById('profileimage') as HTMLDivElement;
        this.id = document.getElementById('category')! as HTMLInputElement;
        this.editid = store.getState().editing_id || null;
        this.error = false;

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
        console.log(this.id);
        console.log(this.imageupload)
        //console.log(this.image, this.imageupload, this.category, this.name, this.description, this.editid, this.facebook, this.instagram, this.twitter, this.website, this.id, this.upcomingevent);
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
        this.fetchValues();
    }

    clearForm(){
        console.log(this.error)
        this.name.value = '';
        this.image.innerHTML = `<lazy-image image="https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png"></lzy-image>`
        this.category.value = '';
        this.description.value = '';
        this.instagram.value = '';
        this.facebook.value = '';
        this.twitter.value = '';
        this.upcomingevent.value = '';
        this.website.value = '';
    }

    deleteProfile(){
        
    }

    fetchValues(){

    }

    setValues(){
        console.log(this.image);
       // const imagetemp ='https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png'
        const data = store.getState().profiles;
        const profile: Profile = data.filter((prof:Profile) => prof.id === this.editid)[0];
        this.name.value = profile.name;
        this.image.innerHTML = `<lazy-image image=${profile.url}></lzy-image>`
        console.log(profile.url)
        this.category.value = profile.type;
        this.description.value = profile.description;
        this.instagram.value = profile.instagram;
        this.facebook.value = profile.facebook;
        this.twitter.value = profile.twitter;
        this.upcomingevent.value = profile.upcomingevent;
        this.website.value = profile.website;
    }

    validateValues(){

    }


}

export default Form;