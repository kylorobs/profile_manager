

// import DOMHelper from '../../DOMHelper/DOMHelper';
import { store } from '../../app';
import { BindThis } from '../../decorators/bindthis';
import { clearErrors } from '../../state/ProfileSlice';
// import { clearErrors } from '../../../state/ProfileSlice';
import DOMHelper from '../../utils/DOMHelper';
import Modal from '../../models/Modal';
import SpreadsheetForm from '../Form/FileInput/SpreadsheetForm/SpreadsheetForm';


class ErrorModal extends Modal {

    error: boolean;

    constructor() {
        super();
        this.error = false;
        store.subscribe(this.showError);
        this.modal.addEventListener('exitModal', () => store.dispatch(clearErrors()))
    }


    @BindThis
    public showError(): void {
        const error = store.getState().data.error;
        if (!error) {
            if (this.error === true) this.error = false;
            return;
        };

        this.error = true;
        const errorMsg = store.getState().data.errorMessage;
        const message = `
            <h3> Whoah! We have an Error... </h3>
            ${errorMsg}
            `
        const div = DOMHelper.createDivHTML(message);
        if (errorMsg.includes('spreadsheet')) DOMHelper.appendChild(div, this.emptyDatabaseButton())
        this.showModal(div);
    }

    public emptyDatabaseButton() {
        function uploadSpreadsheet() {
            store.dispatch(clearErrors());
            new SpreadsheetForm();
        }
        const btn = DOMHelper.create<HTMLKclsuButtonElement>('kclsu-button');
        btn.text = 'Upload spreadsheet';
        btn.addEventListener('click', uploadSpreadsheet);
        return btn;
    }


}

export default ErrorModal;


