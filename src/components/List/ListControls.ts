
import ButtonHandler from '../../utils/ButtonConfigurer';
import { store } from '../../app'
import { changeFilter } from '../../state/ProfileSlice';
import DOMHelper from '../../utils/DOMHelper';
import type { Filter } from '../../types/types';
import FilterSelect from '../FilterSelect/FilterSelect';
import { BindThis } from '../../decorators/bindthis';


class ListControls {
    public title: string = 'All'; // the name of the filter
    public el: any;
    private FilterSelect: FilterSelect;
    private cardCount: HTMLSpanElement;
    private resetFilterElement: HTMLKclsuButtonElement;


    constructor(filterConfig: Filter[], title: string, count: number) {
        this.title = title;
        this.resetFilterElement = this.createButton();
        this.cardCount = DOMHelper.create<HTMLSpanElement>('span');
        this.FilterSelect = new FilterSelect(filterConfig)
        // this.FilterSelect.style.margin = '15px';
        this.cardCount.innerText = `Count: ${count}`;
        // this.cardCount.style.fontSize = '0.9em';
        this.el = this.createContainer();
    }

    @BindThis
    clearFilter() {
        this.FilterSelect.clearFilter();
        store.dispatch(changeFilter(''));
    }

    private createButton(): HTMLKclsuButtonElement {
        const button = DOMHelper.create<HTMLKclsuButtonElement>('kclsu-button');
        button.text = 'reset';
        button.verysmall = true;
        button.purple = true;
        button.emitid = 'resetFilter';

        const btnHandler = ButtonHandler.getInstance();
        btnHandler.addEmitter('resetFilter', this.clearFilter);
        return button
    }


    private createContainer() {
        const container = DOMHelper.create<HTMLDivElement>('div');
        const flexC = DOMHelper.createFlexContainer('space-around', 'center', true);
        const flexFilters = DOMHelper.createFlexContainer('center', 'center', true);
        DOMHelper.appendChild(flexFilters, this.FilterSelect.el)
        DOMHelper.appendChild(container, flexFilters)
        DOMHelper.appendChildren(flexC, [this.cardCount, this.resetFilterElement])
        DOMHelper.appendChild(container, flexC)
        return container;
    }

    public updateFilter(title: string, count: number) {
        this.title = title;
        this.cardCount.innerText = `Count: ${count}`
    }
}

export default ListControls;