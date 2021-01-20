import Modal from "../Modal";
import { BindThis } from '../../../decorators/bindthis';
import { store } from '../../../app'

class LoadingModal {
    
    loadingmodal: Modal;

    constructor(){
        this.loadingmodal = Modal.getInstance();
        store.subscribe(this.checkForLoadingState);
    }

    @BindThis
    public checkForLoadingState(): void{
        const loadingState = store.getState().data.loading;
        if (loadingState) this.loadingmodal.showSpinner();
        else if (!loadingState) this.loadingmodal.exitModal();
    }
}

export default LoadingModal;