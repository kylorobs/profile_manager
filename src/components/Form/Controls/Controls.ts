
import FormButtons from './Buttons/Buttons';
import Modal from '../../../models/Modal';
import ButtonHandler from '../../../utils/ButtonConfigurer';
import { BindThis } from '../../../decorators/bindthis';
import { FormFunctions } from '../../../types/types';
import { store } from '../../../app';
import { notLoading } from '../../../state/ProfileSlice';
import DOMHelper from '../../../utils/DOMHelper';

class FormControls {

    static instance: FormControls;
    private formButtons: any;
    private contentModal: Modal;

    constructor(editMode: boolean, formFunctions: FormFunctions, updateOnly: boolean) {
        this.formButtons = new FormButtons(editMode);
        this.contentModal = new Modal();
        this.configureButtons(formFunctions, updateOnly);
    }

    public toggleEditMode(val: boolean) {
        this.formButtons.toggleEditMode(val);
    }

    private configureButtons(formFns: FormFunctions, updateOnly: boolean) {
        //CREATE BUTTONS ON FORM 
        this.formButtons.createButton('Update', false, 'updateHandler', 'bottom', this.handleUpdate);
        if (formFns.add) this.formButtons.createButton('Create New', false, 'addHandler', 'editing-bottom', this.handleAdd);
        if (formFns.delete) this.formButtons.createButton('Delete', true, 'deleteHandler', 'bottom', this.handleDelete);
        if (formFns.switch) this.formButtons.createButton(updateOnly ? 'Stop Editing' : 'New Entry Form', true, 'switch', 'editing-top', formFns.switch);
        this.formButtons.resetButtons();

        //CREATE BUTTON EVENTS AND HANDLERS
        // BUTTON ELEMENTS CREATED DYNAMICALLY
        const modalButtons = ButtonHandler.getInstance();
        modalButtons.addEmitter('update', formFns.update);
        if (formFns.add) modalButtons.addEmitter('add', formFns.add);
        if (formFns.delete) modalButtons.addEmitter('delete', formFns.delete);
        modalButtons.addEmitter('cancel', this.cancelConfirm);
        // modalButtons.addEmitter('switch', formFns.switch);
    }

    @BindThis
    handleUpdate() {
        const modalMessage = this.buildModalContent('update', 'Are you sure you want to make an update? Double check before proceeding.')
        this.contentModal.showModal(modalMessage);
    }

    @BindThis
    handleDelete() {
        const modalMessage = this.buildModalContent('delete', 'Are you sure you want to DELETE? Double check before proceeding.')
        this.contentModal.showModal(modalMessage);
    }

    @BindThis
    handleAdd() {
        const modalMessage = this.buildModalContent('add', 'You are about to submit a new entry. Double check before proceeding.')
        this.contentModal.showModal(modalMessage);
    }

    @BindThis
    handleSwitch() {
        const modalMessage = this.buildModalContent('switch', 'You are switching to an empty template. Any changes will be lost.')
        this.contentModal.showModal(modalMessage);
    }

    @BindThis
    cancelConfirm() {
        this.contentModal.exitModal();
        store.dispatch(notLoading());
    }

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

}
export default FormControls;