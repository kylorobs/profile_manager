
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import FileUploader from '../../../../models/FileUploader';
import { loading, notLoading, setError } from '../../../../state/ProfileSlice';
import ButtonHandler from '../../../../utils/ButtonConfigurer';
import DOMHelper from '../../../../utils/DOMHelper';
import UploadModal from '../../../Modals/UploadModal';
import * as thunks from '../../../../state/thunks/profile';
import { KeyMap } from '../../../../types/types';


class SpreadsheetForm {

    private uploadModal: UploadModal;
    public imageurl: string = '';
    private uploader: FileUploader

    constructor() {
        this.uploader = new FileUploader({ acceptedTypes: '.xls,.xlsx' }, this.confirmUpload)
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
        console.log(store.getState().form.keymap)
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
    showLoadingState() {
        const loadingState = store.getState().data.loading;
        if (loadingState) this.uploadModal.showSpinner();
        else this.uploadModal.exitModal();
    }

    verifyKeyName(obj: any, keymap: KeyMap[]) {
        return keymap.find((key) => obj[key.keyName])
    };

    hasCorrectColumnCount(uploadedObj: any, keymap: KeyMap[]) {
        return Object.keys(uploadedObj).length === Object.keys(keymap).length
    }

    uploadErrorHandler(msg: string) {
        store.dispatch(notLoading());
        store.dispatch(setError(msg))
    }


    @BindThis
    uploadImage(selectedFile: Blob) {
        // this.uploadModal.showSpinner();
        store.dispatch(loading());
        try {
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                const data = e.target!.result;
                const workbook = (<any>window).XLSX.read(data, {
                    type: 'binary'
                })
                workbook.SheetNames.forEach((sheetname: string) => {
                    const XL_row_object = (<any>window).XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetname]);
                    var result = JSON.parse(JSON.stringify(XL_row_object));
                    const data = {} as { [key: string]: any };
                    const keyConfiguration = store.getState().form.keymap;
                    let valid = result.length > 0 && this.hasCorrectColumnCount(result[0], keyConfiguration);
                    if (result.length < 1 || this.verifyKeyName)
                        result.forEach((entry: any) => {
                            if (!this.verifyKeyName(entry, keyConfiguration)) valid = false;
                            const uid = `-${(Math.random() + 1).toString(36).substring(2)}`;
                            data[uid] = entry;
                        })
                    if (!valid) this.uploadErrorHandler('Spreadsheet column names do not match provided configuration. Make sure your spreadsheet has the exact same column headings as the keynames specified in the configuration.');
                    // upload data
                    store.dispatch(thunks.uploadData(data));
                })
            }

            reader.onerror = _ => {
                this.uploadErrorHandler('Error converting file. Only Excel file types accepted')
            }

            reader.readAsBinaryString(selectedFile);

        } catch (er) {
            store.dispatch(setError('Failed to upload file: ' + er))
        }
    }

}

export default SpreadsheetForm;

