
// USE SINGLETON PATTERN
// CREATES A MODAL FOR THE PAGE
// HANDLES HIDING AND SHOWING OF MODAL
// HANDLES UPDATES 

import { BindThis } from "../../decorators/bindthis";



class Modal {

    static instance: Modal;
    private modal: HTMLKclsuModalElement;

    private constructor(){
        this.modal = this.createModalElement();
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
        modal.show = false;
        return modal;
    }

    @BindThis
    public showModal(el:HTMLDivElement): void{
        this.modal.innerHTML = '';
        this.modal.appendChild(el);
        this.modal.show = true;
    }

    @BindThis
    public exitModal(){
        this.modal.innerHTML = '';
        this.modal.show = false;
    }



}

export default Modal;