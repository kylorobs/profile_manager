
// USE SINGLETON PATTERN
// CREATES A MODAL FOR THE PAGE
// HANDLES HIDING AND SHOWING OF MODAL
// HANDLES UPDATES 

import { BindThis } from "../../decorators/bindthis";



class Modal {

    static instance: Modal;
    private modal: HTMLKclsuModalElement;
    private spinner: HTMLLoadingSpinnerElement;
    public active: boolean;

    private constructor(){
        this.modal = this.createModalElement();
        this.active = false;
        this.spinner = document.createElement('loading-spinner');
        this.spinner.style.padding = '2em';
        document.getElementById('app')?.appendChild(this.modal);
        document.addEventListener('exitModal', this.exitModal);
    }

    static getInstance(): Modal{
        if (this.instance) return this.instance;
        else {
            this.instance = new Modal();
            return this.instance;
        }; 
    }

    private createModalElement(): HTMLKclsuModalElement{
        const modal = document.createElement('kclsu-modal') as HTMLKclsuModalElement;
        modal.autoexit = true;
        modal.show = this.active;
        return modal;
    }


    @BindThis
    public showModal(el:HTMLDivElement | HTMLLoadingSpinnerElement | HTMLFormElement): void{
        this.modal.innerHTML = '';
        this.modal.appendChild(el);
        this.modal.show = true;
        this.active = true;
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
    }



}

export default Modal;