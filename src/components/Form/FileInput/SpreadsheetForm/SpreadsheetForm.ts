
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

    checkColumnsMatchConfig(obj: UnknownInput, keymap: KeyMap[]) {
        const columnNames = Object.keys(obj);
        const eachColumnFoundInConfig = columnNames.every(name => keymap.find(map => map.keyName === name));
        const eachKeyNameHasAColumn = keymap.every((key) => obj[key.keyName]);
        return eachColumnFoundInConfig && eachKeyNameHasAColumn;
    };

    getRequiredFields(keymap: KeyMap[]) {
        return keymap.filter(map => map.validationTypes.includes('isRequired')).map(required => required.keyName)
    }

    meetsRequiredData(obj: UnknownInput, keymap: KeyMap[]) {
        const requiredKeys = this.getRequiredFields(keymap);
        return requiredKeys.every((required) => obj[required]);
    }

    fillInMissingKeyNames(entries: UnknownInput[], keymap: KeyMap[]) {
        return entries
            .map((entry: any) => {
                const updatedObj = { ...entry };
                keymap.forEach(map => {
                    if (updatedObj[map.keyName] && map.keyName.includes('date_time')) {
                        updatedObj[map.keyName] = this.excelDateToJSDate(updatedObj[map.keyName]);
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
        const jsDate = new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
        return new Date(jsDate.getTime() - (jsDate.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
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

                    try {
                        const XL_row_object = (<any>window).XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetname]);
                        let parsedSpreadsheet = JSON.parse(JSON.stringify(XL_row_object));
                        const data = {} as { [key: string]: any };
                        const keyConfiguration = store.getState().form.keymap;
                        const result = this.fillInMissingKeyNames(parsedSpreadsheet, keyConfiguration);
                        if (result.length < 1) throw new Error('You uploaded an empty spreadsheet!');
                        if (!this.checkColumnsMatchConfig(result[0], keyConfiguration)) throw new Error(`Spreadsheet column names do not match provided configuration. Make sure your spreadsheet has the exact same column headings as the keynames specified in the configuration.*************************  The column names found are: ${Object.keys(parsedSpreadsheet[0]).join(', ')} ************************* The required keys are: ${keyConfiguration.map(key => key.keyName).join(', ')}`);
                        let valid = true;
                        result.forEach((entry: UnknownInput) => {
                            if (!this.meetsRequiredData(entry, keyConfiguration)) valid = false;
                            const uid = `-${(Math.random() + 1).toString(36).substring(2)}`;
                            data[uid] = entry;
                        });
                        if (!valid) throw new Error('Empty rows have been uploaded. OR there is a missing value for a required column. The required columns include: *********   ' + this.getRequiredFields(keyConfiguration).join(',') + '********. SUGGESTION: If your spreadsheet contains a empty rows with RED or ORANGE highlighted cells, delete all empty rows with a highlighted cell.')
                        else store.dispatch(thunks.uploadData(data));  // upload data

                    } catch (e) {
                        this.uploadErrorHandler(`${e}`);
                    }
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

