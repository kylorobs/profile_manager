
import ButtonHandler from '../../../../models/ButtonHandler';

class FormButtons {

    static instance: FormButtons;
    public editMode: boolean;
    private editModeButtons: HTMLKclsuButtonElement[];
    private topButtons: HTMLKclsuButtonElement[];
    private bottomButtons: HTMLKclsuButtonElement[];
    private bottomBtnContainer: HTMLDivElement;
    private topBtnContainer: HTMLDivElement;

    constructor(editMode: boolean){
        this.editMode = editMode;
        this.bottomBtnContainer = this.createButtonsContainer('flex-center-center');
        this.topBtnContainer = this.createButtonsContainer('flex-end-center');
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


    private createButtonsContainer(flexClass: string): HTMLDivElement {
        const container = document.createElement('div');
        container.classList.add(flexClass);
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
                button.margin = '100px';
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