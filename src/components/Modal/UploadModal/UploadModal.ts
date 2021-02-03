

// import DOMHelper from '../../DOMHelper/DOMHelper';
import DOMHelper from '../../DOMHelper/DOMHelper';
import Modal from '../Modal';


class UploadModal extends Modal {
    
    public imageurl: string;

    constructor(){
      super();
      this.imageurl = '';
    }


    showError(msg:string){
        const message = `
            <h3> Whoah! Upload Error... </h3>
            <p> ${msg}!</p>`
        const div = DOMHelper.createDivHTML(message);
        this.showModal(div);
    }

    showForm(form: HTMLFormElement){
        this.showModal(form);
    }

}

export default UploadModal;


 