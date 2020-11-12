
// import {Categories} from '../../types/types';
import {store} from '../../app';
import {BindThis} from '../../decorators/bindthis';

class Form {
    private category: HTMLSelectElement;
    private name: HTMLInputElement;
    private description: HTMLInputElement;
    private instagram: HTMLInputElement;
    private facebook: HTMLInputElement;
    private twitter: HTMLInputElement;
    private website: HTMLInputElement;
    private upcomingevent: HTMLInputElement;
    private url: HTMLInputElement;
    private id: HTMLInputElement;
    private editid: string | null;
    private error: boolean;

    constructor(){
        this.category = document.getElementById('category')! as HTMLSelectElement;
        this.name = document.getElementById('category')! as HTMLInputElement;
        this.description = document.getElementById('category')! as HTMLInputElement;
        this.instagram = document.getElementById('category')! as HTMLInputElement;
        this.facebook = document.getElementById('category')! as HTMLInputElement;
        this.twitter = document.getElementById('category')! as HTMLInputElement;
        this.website = document.getElementById('category')! as HTMLInputElement;
        this.upcomingevent = document.getElementById('category')! as HTMLInputElement;
        this.url = document.getElementById('category')! as HTMLInputElement;
        this.id = document.getElementById('category')! as HTMLInputElement;
        this.editid = store.getState().editing_id || null;
        this.error = false;

        this.configure();
        store.subscribe(this.configure);
    }

    @BindThis
    configure(){
        this.editid = store.getState().editing_id || null;
        this.configureButtons();
    }

    @BindThis
    configureButtons(){
        const btnContainer = document.querySelector('form .profile flex-container')! as HTMLFlexContainerElement;
        btnContainer.innerHTML ='';
        console.log(this.category, this.name, this.description, this.editid, this.facebook, this.instagram, this.twitter, this.website, this.id, this.url, this.upcomingevent);
        const div = document.createElement('div');
        if(this.editid) div.innerHTML = `<kclsu-button small emitid="updatebaby"> Update </kclsu-button><kclsu-button purple small emitid="deletebaby">Delete</kclsu-button>`;
        else div.innerHTML = `<kclsu-button emitid="emitClick" small center> Add Profile </kclsu-button>`
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
            case 'addNew' : this.clearForm()
                break;
            default: console.log('button click error')
        }
    }

    submitForm(){
        this.fetchValues();
    }

    clearForm(){

    }

    deleteProfile(){

    }

    fetchValues(){
        
    }

    setValues(){

    }

    validateValues(){

    }


}

export default Form;