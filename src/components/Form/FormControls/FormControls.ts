
import FormButtons from './FormButtons/FormButtons';
import Modal from '../../Modal/modal';
import ButtonHandler from '../../../models/ButtonHandler';
import { BindThis } from '../../../decorators/bindthis';
import {FormFunctions} from '../../../types/types';

class FormControls {

    static instance: FormControls;
    private formButtons: any;
    private modal: Modal;

    constructor(editMode: boolean, formFunctions: FormFunctions){
        this.formButtons = new FormButtons(editMode);
        this.modal = Modal.getInstance();
        this.configureButtons(formFunctions);
    }

    public toggleEditMode(val: boolean){
        this.formButtons.toggleEditMode(val);
    }

    private configureButtons(formFns:FormFunctions){
        //CREATE BUTTONS ON FORM 
        this.formButtons.createButton('Update', false, 'updateHandler', 'bottom', this.handleUpdate);
        this.formButtons.createButton('Create New', false, 'addHandler', 'editing-bottom', this.handleAdd);
        this.formButtons.createButton('Delete', true, 'deleteHandler', 'bottom', this.handleDelete);
        this.formButtons.createButton('Switch To New Entry Form', true, 'switch', 'editing-top', formFns.switch);
        this.formButtons.resetButtons();

        //CREATE BUTTON EVENTS AND HANDLERS
        // BUTTON ELEMENTS CREATED DYNAMICALLY
        const modalButtons= ButtonHandler.getInstance();
        modalButtons.addEmitter('update', formFns.update);
        modalButtons.addEmitter('add', formFns.add);
        modalButtons.addEmitter('delete', formFns.delete);
        // modalButtons.addEmitter('switch', formFns.switch);
    }

    @BindThis
    handleUpdate(){
        const modalMessage = this.buildModalContent('update', 'Are you sure you want to make an update? Double check before proceeding.')
        this.modal.showModal(modalMessage);
    }

    @BindThis
    handleDelete(){
        const modalMessage = this.buildModalContent('delete', 'Are you sure you want to DELETE? Double check before proceeding.')
        this.modal.showModal(modalMessage);
    }

    @BindThis
    handleAdd(){
        const modalMessage = this.buildModalContent('add', 'Are you sure you want to make an update? Double check before proceeding.')
        this.modal.showModal(modalMessage);
    }

    @BindThis
    handleSwitch(){
        const modalMessage = this.buildModalContent('switch', 'You are switching to an empty template. Any changes will be lost.')
        this.modal.showModal(modalMessage);
    }

    buildModalContent(type: string, text: string): HTMLDivElement{
        const parent = document.createElement('div');
        const content = `
            <p>${text}</p>
            <flex-container alignx="center">
                <kclsu-button emitid="${type}">Proceed</kclsu-button>
                <kclsu-button >Cancel</kclsu-button>
            </flex-container>`;
        parent.innerHTML = content;
        return parent;
    }

}
export default FormControls;