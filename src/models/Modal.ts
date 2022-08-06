

import { BindThis } from "../decorators/bindthis";
import DOMHelper from "../utils/DOMHelper";


class Modal {

    protected modal: HTMLKclsuModalElement;
    protected spinner: HTMLLoadingSpinnerElement;
    public active: boolean;
    // public spinneractive: boolean;

    constructor() {
        this.modal = this.fetchModalElement();
        this.active = false;
        // this.spinneractive = false;
        this.spinner = document.createElement('loading-spinner');
    }


    private fetchModalElement() {
        let modal = document.querySelector('kclsu-modal');
        modal!.autoexit = true;
        if (!modal) {
            modal = this.createModalElement();
            document.getElementById('app')?.appendChild(this.modal);
            document.addEventListener('exitModal', this.exitModal);
        }
        return modal;
    }

    private createModalElement(): HTMLKclsuModalElement {
        const modal = document.createElement('kclsu-modal') as HTMLKclsuModalElement;
        modal.autoexit = true;
        modal.show = this.active;
        return modal;
    }


    @BindThis
    public showModal(el: HTMLDivElement | HTMLLoadingSpinnerElement | HTMLFormElement): void {
        this.modal.show = true;
        this.modal.innerHTML = DOMHelper.sanitise('');
        DOMHelper.appendChild(this.modal, el)
        this.active = true;
    }


    @BindThis
    public showSpinner(): void {
        this.spinner.show = true;
        this.showModal(this.spinner)
    }

    @BindThis
    public exitModal() {
        this.modal.innerHTML = '';
        this.spinner.show = false;
        this.modal.show = false;
        // this.spinneractive = false;
        this.active = false;
    }



}

export default Modal;