
import { store } from '../../../../app';
import { BindThis } from '../../../../decorators/bindthis';
import FileUploader from '../../../../models/FileUploader';
import { loading, notLoading, setError } from '../../../../state/ProfileSlice';
import ButtonHandler from '../../../../utils/ButtonConfigurer';
import DOMHelper from '../../../../utils/DOMHelper';
import UploadModal from '../../../Modals/UploadModal';
import * as thunks from '../../../../state/thunks/profile';
import { KeyMap } from '../../../../types/types';


type UnknownInput = { [key: string]: any };


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
            <p> Warning - the spreadsheet column headings must precisely match the input key names specified in this Manager's configuration. Do not create extra columns.</p>

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
    showLoadingState() {
        const loadingState = store.getState().data.loading;
        if (loadingState) this.uploadModal.showSpinner();
        else this.uploadModal.exitModal();
    }

    verifyKeyName(obj: UnknownInput, keymap: KeyMap[]) {
        return keymap.find((key) => obj[key.keyName])
    };

    fillInMissingKeyNames(entries: UnknownInput[], keymap: KeyMap[]) {
        return entries.map((entry: any) => {
            const updatedObj = { ...entry };
            keymap.forEach(map => {
                if (updatedObj[map.keyName] && map.keyName.includes('date')) {
                    updatedObj[map.keyName] = this.excelDateToJSDate(updatedObj[map.keyName]);
                    console.log('handled_date')
                    return;
                }
                if (updatedObj[map.keyName]) return;
                updatedObj[map.keyName] = '';
            })
            return updatedObj;
        })
    }


    hasCorrectColumnCount(uploadedObj: UnknownInput, keymap: KeyMap[]) {
        return Object.keys(uploadedObj).length === keymap.length
    }

    uploadErrorHandler(msg: string) {
        store.dispatch(notLoading());
        store.dispatch(setError(msg))
    }

    excelDateToJSDate(serial: any) {
        var utc_days = Math.floor(serial - 25569);
        var utc_value = utc_days * 86400;
        var date_info = new Date(utc_value * 1000);

        var fractional_day = serial - Math.floor(serial) + 0.0000001;

        var total_seconds = Math.floor(86400 * fractional_day);
        var seconds = total_seconds % 60;
        total_seconds -= seconds;

        var hours = Math.floor(total_seconds / (60 * 60));
        var minutes = Math.floor(total_seconds / 60) % 60;

        return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
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
                    console.log(XL_row_object)
                    console.log(JSON.stringify(XL_row_object))
                    let parsedSpreadsheet = JSON.parse(JSON.stringify(XL_row_object));
                    console.log('----Parsed---');
                    console.log(parsedSpreadsheet)
                    console.log('-------');
                    const data = {} as { [key: string]: any };
                    const keyConfiguration = store.getState().form.keymap;
                    const result = this.fillInMissingKeyNames(parsedSpreadsheet, keyConfiguration);
                    console.log('----Result---');
                    console.log(result)
                    console.log('-------');
                    let valid = result.length > 0 && this.hasCorrectColumnCount(result[0], keyConfiguration);
                    if (result.length < 1 || this.verifyKeyName)
                        result.forEach((entry: UnknownInput) => {
                            if (!this.verifyKeyName(entry, keyConfiguration)) valid = false;
                            const uid = `-${(Math.random() + 1).toString(36).substring(2)}`;
                            data[uid] = entry;
                        })
                    if (!valid) this.uploadErrorHandler('Spreadsheet column names do not match provided configuration. Make sure your spreadsheet has the exact same column headings as the keynames specified in the configuration.');
                    // upload data
                    else store.dispatch(thunks.uploadData(result));
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

