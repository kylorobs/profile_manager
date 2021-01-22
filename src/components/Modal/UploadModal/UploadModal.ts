

import Modal from '../Modal';


class UploadModal extends Modal {
    
    public imageurl: string;

    constructor(){
      super();
      this.imageurl = '';
    }


    showError(msg:string){
        const div = document.createElement('div');
        const message = `
        <h3> Whoah! Upload Error... </h3>
        <p> ${msg}!</p>
        `
        div.innerHTML = message;
        this.showModal(div);
    }

    showForm(form: HTMLFormElement){
        this.showModal(form);
    }

}

export default UploadModal;


 