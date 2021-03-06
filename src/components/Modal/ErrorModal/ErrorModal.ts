

// import DOMHelper from '../../DOMHelper/DOMHelper';
import { store } from '../../../app';
import { BindThis } from '../../../decorators/bindthis';
import { clearErrors } from '../../../state/ProfileSlice';
// import { clearErrors } from '../../../state/ProfileSlice';
import DOMHelper from '../../DOMHelper/DOMHelper';
import Modal from '../Modal';


class ErrorModal extends Modal {

    error: boolean;
    
    constructor(){
        super();
        this.error = false;
        store.subscribe(this.showError);
        this.modal.addEventListener('exitModal', () => store.dispatch(clearErrors()))
    }


    @BindThis
    showError(): void{
        const error = store.getState().data.error;
        if (!error){
            console.log('NOOO Errrror');
            if (this.error === true) this.error = false;
            return;
        };
            
        this.error = true;
        const message = `
            <h3> Whoah! We have an Error... </h3>
            <p> ${store.getState().data.errorMessage}!</p>
            `
        const div = DOMHelper.createDivHTML(message);
        this.showModal(div);
    }

}

export default ErrorModal;


 