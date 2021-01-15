
import ButtonHandler from '../../../models/ButtonHandler';
import {store} from '../../../app'
import { changeFilter } from '../../../state/ProfileSlice';
import DropArea from '../../DropArea/DropArea';

class ListFilter {
    public title: string = 'All'; // the name of the filter
    private titleElement: any;
    private resetFilterElement: HTMLKclsuButtonElement;
    el: any;

    constructor(title: string){
        this.title = title;
        this.resetFilterElement = this.createButton();


        this.titleElement = document.createElement('h4');
        this.titleElement.innerText = `View: ${this.title}`;
        this.titleElement.style.margin = '15px';

        this.el = this.createContainer();
    }

    clearFilter(){
        DropArea.removeClickedClass();
        store.dispatch(changeFilter(''));
    }

    private createButton(): HTMLKclsuButtonElement{
        const button = document.createElement('kclsu-button');
        button.text = 'reset filter';
        button.verysmall = true;
        button.purple = true;
        button.emitid = 'resetFilter';

        const btnHandler = ButtonHandler.getInstance();
        btnHandler.addEmitter('resetFilter', this.clearFilter);
        return button
    }


    private createContainer(){
        const flexC = document.createElement('flex-container') as HTMLFlexContainerElement;
        flexC.alignx = 'space-between';
        flexC.aligny = 'center';
        flexC.appendChild(this.titleElement);
        flexC.appendChild(this.resetFilterElement);
        return flexC;
    }

    public updateFilter(title: string){
        this.title = title;
        const text = !title ? 'All' : title;
        this.titleElement.innerText = `View: ${text}`;
    }
}

export default ListFilter;