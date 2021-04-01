import Modal from "../../models/Modal";
import { BindThis } from '../../decorators/bindthis';
import { store } from '../../app'

class LoadingModal extends Modal {
    
    constructor(){
        super();
        store.subscribe(this.checkForLoadingState);
    }

    @BindThis
    public checkForLoadingState(): void{
        const loadingState = store.getState().data.loading;
        if (loadingState) this.showSpinner();
        else if (!loadingState) this.exitModal();
    }
}

export default LoadingModal;