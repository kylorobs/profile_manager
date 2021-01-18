
import ButtonHandler from '../../../../models/ButtonHandler';

class FormButtons {

    static instance: FormButtons;
    public editMode: boolean;
    private editModeButtons: HTMLKclsuButtonElement[];
    private topButtons: HTMLKclsuButtonElement[];
    private bottomButtons: HTMLKclsuButtonElement[];
    private bottomBtnContainer: HTMLFlexContainerElement;
    private topBtnContainer: HTMLFlexContainerElement;

    constructor(editMode: boolean){
        this.editMode = editMode;
        this.bottomBtnContainer = this.createButtonsContainer('center', 'center', true);
        this.topBtnContainer = this.createButtonsContainer('flex-end', 'center', true);
        this.editModeButtons = [];
        this.topButtons = [];
        this.bottomButtons = [];
        const form = document.getElementById('textinputs')!

        //APPEND BUTTON CONTAINER TO FORM
        form.appendChild(this.bottomBtnContainer);

        //PREPEND CLEARFORM BUTTON CONTAINER TO FORM
        form.prepend(this.topBtnContainer);
    }

    public toggleEditMode(val: boolean){
        this.editMode = val;
        this.resetButtons();
    }


    private createButtonsContainer(x: string, y: string, flexwrap: boolean): HTMLFlexContainerElement {
        const container = document.createElement('flex-container') as HTMLFlexContainerElement;
        container.alignx = x;
        container.aligny = y;
        container.wrap = flexwrap;
        container.fillcontainer = true;
        return container;
    }

    public createButton ( text: string, purple: boolean, emitId: string, position: 'editing-top' | 'editing-bottom' | 'bottom', cb: (e:Event) => void ): void{
        const button = document.createElement('kclsu-button') as HTMLKclsuButtonElement;
        button.text = text;
        button.purple = purple;
        button.emitid = emitId;
        switch (position){
            case 'bottom' :
                this.editModeButtons.push(button);
                break;
            case 'editing-bottom' :
                this.bottomButtons.push(button);
                break;
            case 'editing-top' :
                button.verysmall = true;
                this.topButtons.push(button);
                break;
            default : throw new Error('Unable to place Button')
        }

        //REGISTER EMITIDS IN BUTTON CLASS CLICK LISTENER
        const btnHandler = ButtonHandler.getInstance(); 
        btnHandler.addEmitter(emitId, cb);
    }

    public resetButtons(){
        this.bottomBtnContainer.innerHTML = '';
        this.topBtnContainer.innerHTML = '';
        this.renderButtons();
    }

    private renderButtons(){
        if (this.editMode){
            this.renderHelper(this.editModeButtons, this.bottomBtnContainer);
            this.renderHelper(this.topButtons, this.topBtnContainer);
        }
        else this.renderHelper(this.bottomButtons, this.bottomBtnContainer);
    }

    private renderHelper(ar: any[], container: any){
        ar.forEach(btn => container.appendChild(btn))
    }   

}
export default FormButtons;