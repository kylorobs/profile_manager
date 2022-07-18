

import { store } from '../app';
import { resetEditMode, startEditingNew } from '../state/FormSlice';
import { BindThis } from '../decorators/bindthis';
import { Profile, KeyMap } from '../types/types';
import TextInput from '../components/Form/TextInput/TextInput';
import FileInput from '../components/Form/FileInput/FileInput';
import FormControls from '../components/Form/Controls/Controls';
import Validator from '../utils/Validator';
import FormErrorModal from '../components/Modals/FormErrorModal';
import * as thunks from '../state/thunks/profile';
import Modal from '../models/Modal';
import { loading, setError } from '../state/ProfileSlice';
import { html_ids } from '../utils/htmlIds';
// import DOMHelper from '../utils/DOMHelper';

type Inputs = TextInput | FileInput;

class Form {
    private editid: string | null;
    private formInputs: Inputs[];
    private errorModal: FormErrorModal;
    private formControls: FormControls;
    private submitModal: Modal;

    constructor(keyMappings: KeyMap[], updateOnly?: boolean) {
        this.editid = store.getState().form.editing_id || null;
        this.errorModal = new FormErrorModal();

        //Find out if there are Image or Document input maps
        const containsFileInputs = keyMappings.find(map => map.type === 'document_file' || map.type === 'image_file');

        // If there are no Image or Document input maps, adjust layout
        if (!containsFileInputs) {
            this.adjustFormLayout();
        }

        // Create input classes, separating file inputs and text/select inputs
        const inputs = keyMappings.map((map: KeyMap) => {
            if (map.type === 'document_file' || map.type === 'image_file') return new FileInput('fileinputs', false, map, map.keyName);
            else return new TextInput('textinputs', map);
        });

        this.formInputs = inputs;

        // Supply the handler functions which will allow the FormControls to update form state 
        this.formControls = new FormControls(!!this.editid, {
            update: () => this.submitForm('update'),
            add: updateOnly ? undefined : () => this.submitForm('add'),
            delete: updateOnly ? undefined : this.deleteData,
            switch: this.handleSwitchToEmptyForm
        })

        this.submitModal = new Modal();
        this.setEditingState();
        store.subscribe(this.setEditingState);
    }

    setValues(): void {
        const data = store.getState().data.profiles;

        //Fetch profile with matching ID
        const profile: Profile = data.filter((prof: Profile) => prof.id === this.editid)[0];
        //Pull all object keys from profile
        const profileKeys: string[] = Object.keys(profile);

        // For each input, find matching key name
        // If a text / select input, set the value property
        // If a file input, invoke the update function for that component
        this.formInputs
            .forEach((input: Inputs) => {
                const key = profileKeys.find((key: string) => key === input.title);
                if ('el' in input && key) {
                    input.el.value = profile[key];
                    input.el.style.border = '';
                }
                else if ('el' in input) input.el.value = '';
                else if ('imageurl' in input && key) input.updateImageUrl(profile[key]);
                else store.dispatch(setError('Input typed not able to map to a class '));
            })
    }

    // Check for an editID or Loading boolean in global state. 
    // Set values if editId exists
    @BindThis
    private setEditingState(): void {
        const editId = store.getState().form.editing_id;
        const editingNew = store.getState().form.editing_new;
        const oldId = this.editid;

        if (editingNew) return; //If we are currently adding a new entry, return to entry
        else if (editId !== oldId) {
            this.editid = editId;
            if (!!editId) {
                this.setValues();
                this.formControls.toggleEditMode(true);
            }
            else this.swithToEmptyForm();
        }
    }

    // Adjust styles of Div Elements contained within form
    private adjustFormLayout(): void {
        const filesColumn = document.getElementById(html_ids.fileinputs)! as HTMLDivElement;
        const textColumn = document.getElementById(html_ids.textinputs)! as HTMLDivElement;
        filesColumn.style.display = 'none';
        // Make column full width
        textColumn.style.width = '100%';
        textColumn.style.maxWidth = '800px';
        textColumn.style.margin = 'auto';
    }

    // Submit Handler Function
    //Submit the form. We could either be adding a new entry, or updating an existing one
    @BindThis
    submitForm(type: 'add' | 'update') {
        if (type === 'add') store.dispatch(startEditingNew());
        const formErrors = this.validateValues();
        formErrors.length > 0 ? this.handleFormErrors(formErrors) : this.packageData(type);
    }

    handleFormErrors(errors: Validator[]) {
        errors.forEach((er: Validator) => {
            console.log(er)
            const input = this.formInputs.find((input: Inputs) => input.title === er.inputTitle);
            if (input && 'el' in input) {
                input.el.classList.add('validationerror');
                input.el.style.border = '2px solid red'
            }
            this.errorModal.handleErrors(errors)
        })
    }

    // Delete Handler Function
    @BindThis
    deleteData() {
        this.proceedWithConfirmation();
        store.dispatch(thunks.deleteData({
            url: store.getState().data.dataUrl,
            id: this.editid,
        }))
    }

    // New Form Handler Function
    @BindThis
    handleSwitchToEmptyForm() {
        store.dispatch(resetEditMode());
    }

    //We want a blank form, ready for a new entry
    @BindThis
    swithToEmptyForm(): void {
        //Reset editing global state
        this.editid = null;
        this.formControls.toggleEditMode(false);
        // store.dispatch(resetEditMode());
        // Clear all form inputs
        this.formInputs
            .forEach((input: Inputs) => {
                if ('el' in input) {
                    input.el.value = '';
                    input.el.style.border = '';
                }
                else if ('imageurl' in input) input.updateImageUrl('');
                else {
                    console.log('failed to find type of input')
                }
            })
    }


    @BindThis
    validateValues() {
        return this.formInputs
            .map((input: Inputs) => {
                if ('el' in input) {
                    return new Validator(input.el.value, input.keymap)
                }
                else if ('imageurl' in input) {
                    return new Validator(input.imageurl, input.keymap)
                }
                else throw new Error('issue'); //Show Error Modal
            })
            .filter((er: Validator) => !er.isValid)
    }



    private packageData(type: 'add' | 'update'): void {

        this.proceedWithConfirmation();
        const profpackage: Profile = {};

        this.formInputs
            .forEach((input: Inputs) => {
                if ('el' in input) {
                    profpackage[input.title] = input.el.value;
                }
                else if ('imageurl' in input) {
                    profpackage[input.title] = input.imageurl;
                }
                else {
                    console.log('failed to find type of input')
                    console.log(input)
                }

            })

        switch (type) {
            case 'add':
                store.dispatch(thunks.addData({
                    url: store.getState().data.dataUrl,
                    data: profpackage
                }));
                break;
            case 'update':
                store.dispatch(thunks.updateData({
                    url: store.getState().data.dataUrl,
                    id: this.editid,
                    data: profpackage
                }))
                break;
            default: console.log('Unknown button type');
        }


    }

    @BindThis
    public checkForLoadingState(): void {
        const loadingState = store.getState().data.loading;
        if (loadingState) this.submitModal.showSpinner();
        else if (!loadingState && this.submitModal.active) this.submitModal.exitModal()
    }

    //SET LOADING STATE
    proceedWithConfirmation() {
        store.dispatch(loading())
    }
};

export default Form;

