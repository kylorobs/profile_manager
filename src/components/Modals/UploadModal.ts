

// import DOMHelper from '../../DOMHelper/DOMHelper';
import DOMHelper from '../../utils/DOMHelper';
import Modal from '../../models/Modal';


class UploadModal extends Modal {

    public imageurl: string;

    constructor() {
        super();
        this.imageurl = '';
    }


    showError(msg: string) {
        const message = `
            <h3> Whoah! Upload Error... </h3>
            <p> ${msg}!</p>`
        const div = DOMHelper.createDivHTML(message);
        this.showModal(div);
    }

    public showForm(header: string, form: HTMLFormElement) {
        const container = DOMHelper.createDivHTML(undefined, form);
        container.insertAdjacentHTML('afterbegin', header || '')
        this.showModal(container);
    }

}

export default UploadModal;


