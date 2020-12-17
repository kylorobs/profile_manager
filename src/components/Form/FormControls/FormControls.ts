
import ButtonHandler from '../../../models/ButtonHandler';

class FormControls {

    static instance: FormControls;
    public editMode: boolean;
    private editModeButtons: HTMLKclsuButtonElement[];
    private clearFormButtons: HTMLKclsuButtonElement[];
    private createModeButtons: HTMLKclsuButtonElement[];
    private editBtnContainer: HTMLFlexContainerElement;
    private clearBtnContainer: HTMLFlexContainerElement;

    private constructor(editMode: boolean, formId: string){
        this.editMode = editMode;
        this.editBtnContainer = this.createButtonsContainer('center', 'center', true);
        this.clearBtnContainer = this.createButtonsContainer('flex-end', 'center', true);
        this.editModeButtons = [];
        this.clearFormButtons = [];
        this.createModeButtons = [];
        const form = document.getElementById(formId)!

        //APPEND BUTTON CONTAINER TO FORM
        form.appendChild(this.editBtnContainer);

        //PREPEND CLEARFORM BUTTON CONTAINER TO FORM
        form.prepend(this.clearBtnContainer);
        console.log('everything should be appended')
    }

    static getInstance(editMode: boolean, formId: string){
        const instance = this.instance;
        if (instance){
            if (instance.editMode !== editMode) instance.editMode = editMode;
            return this.instance;
        } 
            
        else {
            this.instance = new FormControls(editMode, formId);
            return this.instance;
        }; 
    }

    private createButtonsContainer(x: string, y: string, flexwrap: boolean): HTMLFlexContainerElement {
        const container = document.createElement('flex-container') as HTMLFlexContainerElement;
        container.alignx = x;
        container.aligny = y;
        container.wrap = flexwrap;
        container.fillcontainer = true;
        return container;
    }

    public createButton ( text: string, purple: boolean, emitId: string, type: 'create' | 'update' | 'clear', cb: (e:Event) => void ): void{
        const button = document.createElement('kclsu-button') as HTMLKclsuButtonElement;
        button.text = text;
        button.purple = purple;
        button.emitid = emitId;
        switch (type){
            case 'create' :
                this.createModeButtons.push(button);
                break;
            case 'update' :
                this.editModeButtons.push(button);
                break;
            case 'clear' :
                button.verysmall = true;
                this.clearFormButtons.push(button);
                break;
            default : throw new Error('Unable to place Button')
        }


        //REGISTER EMITIDS IN BUTTON CLASS CLICK LISTENER
        const btnHandler = ButtonHandler.getInstance(); 
        btnHandler.addEmitter(emitId, cb);
    }

    public resetButtons(){
        this.editBtnContainer.innerHTML = '';
        this.clearBtnContainer.innerHTML = '';
        this.renderButtons();
    }

    private renderButtons(){
        console.log('We are re-rendering the buttons and this is the value of edit:');
        console.log(this.editMode);
        if (this.editMode){
            this.renderHelper(this.editModeButtons, this.editBtnContainer);
            this.renderHelper(this.clearFormButtons, this.clearBtnContainer);
        }
        else this.renderHelper(this.createModeButtons, this.editBtnContainer);
    }

    private renderHelper(ar: any[], container: any){
        ar.forEach(btn => container.appendChild(btn))
    }   

}
export default FormControls;