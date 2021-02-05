
import ButtonHandler from '../../../models/ButtonHandler';
import {store} from '../../../app'
import { changeFilter } from '../../../state/ProfileSlice';
import DropArea from '../../DropArea/DropArea';
import DOMHelper from '../../DOMHelper/DOMHelper';

class ListFilter {
    public title: string = 'All'; // the name of the filter
    private titleElement: any;
    private cardCount: HTMLSpanElement;
    private resetFilterElement: HTMLKclsuButtonElement;
    el: any;

    constructor(title: string, count: number){
        this.title = title;
        this.resetFilterElement = this.createButton();
        this.cardCount = DOMHelper.create<HTMLSpanElement>('span');
        this.titleElement = DOMHelper.create<HTMLTitleElement>('h4');

        this.titleElement.innerText = `View: ${this.title}`;
        this.titleElement.style.margin = '15px';
        this.cardCount.innerText = `Count: ${count}`;
        // this.cardCount.style.fontSize = '0.9em';
        this.el = this.createContainer();
    }

    clearFilter(){
        DropArea.removeClickedClass();
        store.dispatch(changeFilter(''));
    }

    private createButton(): HTMLKclsuButtonElement{
        const button = DOMHelper.create<HTMLKclsuButtonElement>('kclsu-button');
        button.text = 'reset';
        button.verysmall = true;
        button.purple = true;
        button.emitid = 'resetFilter';

        const btnHandler = ButtonHandler.getInstance();
        btnHandler.addEmitter('resetFilter', this.clearFilter);
        return button
    }


    private createContainer(){
        const flexC = DOMHelper.createFlexContainer('space-around', 'center', true);
        DOMHelper.appendChildren(flexC, [this.titleElement, this.cardCount, this.resetFilterElement])
        return flexC;
    }

    public updateFilter(title: string, count: number){
        this.title = title;
        const text = !title ? 'View: All' : title;
        this.titleElement.innerText = `${text}`;
        this.cardCount.innerText = `Count: ${count}`
    }
}

export default ListFilter;