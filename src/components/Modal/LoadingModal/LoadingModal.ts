import Modal from "../modal";
import {BindThis} from '../../../decorators/bindthis';
import {store} from '../../../app'

class LoadingModal {
    
    modal: Modal;

    constructor(){
        this.modal = Modal.getInstance();
        store.subscribe(this.checkForLoadingState);
    }

    @BindThis
    public checkForLoadingState(): void{
        const loadingState = store.getState().data.loading;
        if (loadingState) this.modal.showSpinner();
        else if (!loadingState) this.modal.exitModal();
    }
}

export default LoadingModal;