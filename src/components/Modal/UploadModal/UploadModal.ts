

import Modal from '../Modal';


class UploadModal {
    
    public imageurl: string;
    private uploadmodal: Modal;
    

    constructor(){
      this.imageurl = '';
      this.uploadmodal = Modal.getInstance();
    }

    showSpinner(){
        this.uploadmodal.showSpinner();
    }

    showError(msg:string){
        const p = document.createElement('p');
        p.innerText = msg;
        this.uploadmodal.showModal(p)
    }

    showForm(form: HTMLFormElement){
        // const div = document.createElement('div');
        // div.appendChild(form);
        // console.log(div);
        this.uploadmodal.showModal(form);
    }

    exit(){
        this.uploadmodal.exitModal();
    }

}

export default UploadModal;


 