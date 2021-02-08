


import { BindThis } from "../../decorators/bindthis";
import DOMHelper from "../DOMHelper/DOMHelper";
// import { notLoading } from "../../state/ProfileSlice";

class Modal {

    protected modal: HTMLKclsuModalElement;
    private spinner: HTMLLoadingSpinnerElement;
    public active: boolean;

   constructor(){
        this.modal = this.fetchModalElement();
        this.active = false;
        this.spinner = document.createElement('loading-spinner');
    }


    private fetchModalElement(){
        let modal = document.querySelector('kclsu-modal');
        modal!.autoexit = true;
        if (!modal) {
            modal = this.createModalElement();
            document.getElementById('app')?.appendChild(this.modal);
            document.addEventListener('exitModal', this.exitModal);
        }
        return modal;
    }

    private createModalElement(): HTMLKclsuModalElement{
        const modal = document.createElement('kclsu-modal') as HTMLKclsuModalElement;
        modal.autoexit = true;
        modal.show = this.active;
        return modal;
    }


    @BindThis
    public showModal(el:HTMLDivElement | HTMLLoadingSpinnerElement | HTMLFormElement): void{
        console.log('showing modal in main class');
        this.modal.innerHTML = DOMHelper.sanitise('');
        this.modal.appendChild(el);
        console.log(this.modal);
        this.modal.show = true;
        this.active = true;
        console.log(this.modal)
    }


    @BindThis
    public showSpinner(): void{
        this.spinner.show = true;
        this.showModal(this.spinner)
    }

    @BindThis
    public exitModal(){
        this.modal.innerHTML = '';
        this.spinner.show = false;
        this.modal.show = false;
        this.active = false;
        // store.dispatch(notLoading());
    }



}

export default Modal;