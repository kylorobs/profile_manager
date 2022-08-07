
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import FileUploader from '../../../../models/FileUploader';
import { setError } from '../../../../state/ProfileSlice';
import ButtonHandler from '../../../../utils/ButtonConfigurer';
import DOMHelper from '../../../../utils/DOMHelper';
import UploadModal from '../../../Modals/UploadModal';


class SpreadsheetForm {

    private uploadModal: UploadModal;
    public imageurl: string = '';
    private uploader: FileUploader

    constructor() {
        this.uploader = new FileUploader(false, this.confirmUpload)
        this.imageurl = '';
        this.uploadModal = new UploadModal();
        // BUTTON ELEMENTS CREATED DYNAMICALLY
        const modalHeading = `
            <h2> Upload a spreadsheet</h2>
            <p> Upload a spreadsheet to import data into this database, overwriting any existing data.<p>
            <p>⚠️BE ADVISED⚠️ - the spreadsheet column headings must precisely match the input key names specified in this Manager's configuration. Do not create extra columns.</p>
            <p>You can use this template.</p>
        `
        this.uploadModal.showForm(modalHeading, this.uploader.form);
    }

    @BindThis
    confirmUpload(e: Event) {
        const target = e.target as HTMLFormElement;
        const selected = target.querySelector('#upload') as HTMLInputElement

        const selectedFile = selected.files![0];
        const modalButtons = ButtonHandler.getInstance();
        modalButtons.addEmitter('upload', () => this.uploadImage(selectedFile));

        const modalMessage = this.buildModalContent('upload', 'Warning! You are about to overwrite any existing data.')
        this.uploadModal.showModal(modalMessage);
    }

    @BindThis
    buildModalContent(type: string, text: string): HTMLDivElement {
        const div = DOMHelper.createDivHTML();
        const content = `
            <p>${text}</p>
            <flex-container alignx="center">
                <kclsu-button emitid="${type}">Proceed</kclsu-button>
                <kclsu-button purple emitid="cancel">Cancel</kclsu-button>
            </flex-container>`;
        DOMHelper.appendChild(div, content, ['flex-container', 'kclsu-button'], ['alignx', 'emitid', 'purple'])
        return div;
    }


    @BindThis
    uploadImage(selectedFile: Blob) {
        this.uploadModal.showSpinner();
        try {

            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const data = e.target!.result;
                const workbook = (<any>window).XLSX.read(data, {
                    type: 'binary'
                })
                workbook.SheetNames.forEach((sheetname: string) => {
                    const XL_row_object = (<any>window).XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetname]);
                    var json_object = JSON.stringify(XL_row_object);
                    const data = {} as { [key: string]: any };
                    JSON.parse(json_object).forEach((entry: any) => {
                        const uid = `-${(Math.random() + 1).toString(36).substring(2)}`;
                        data[uid] = entry;
                    })
                    // upload data

                })
            }

            reader.onerror = e => {
                throw new Error(e.type);
            }

            reader.readAsBinaryString(selectedFile);

        } catch (er) {

            // this.uploadModal.exitModal();
            store.dispatch(setError('Failed to upload file: ' + er))
        }
    }

}

export default SpreadsheetForm;

