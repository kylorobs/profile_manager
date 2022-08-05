import { Component } from "../../models/Component";
import DOMHelper from "../../utils/DOMHelper";
import { store } from "../../app";
import { BindThis } from "../../decorators/bindthis";
import { changeFilter, updateFilterWithCustomFunction } from "../../state/ProfileSlice";
import type { Filter } from "../../types/types";


class FilterSelect extends Component<HTMLDivElement> {

    public el;
    public customFunctionLookup: { [key: string]: boolean } = {};

    constructor(filterConfig: Filter[]) {
        super();
        this.el = this.createElement();
        const selectEl = DOMHelper.create<HTMLSelectElement>('select');
        DOMHelper.appendChild(this.el, selectEl);
        selectEl.onchange = this.filterList;
        this.createOptions(filterConfig, selectEl);
    }

    createElement(): HTMLDivElement {
        return DOMHelper.create<HTMLDivElement>('div');
    }

    clearFilter() {
        this.el.querySelector('select')!.value = 'all';
    }

    createOptions(filters: Filter[], parent: HTMLSelectElement) {
        const updateFilters = [['View All', 'all'], ...filters];
        updateFilters.forEach((config, i) => {
            const option = DOMHelper.create<HTMLOptionElement>('option', config[0]);
            option.value = config[1];
            if (i === 0) option.selected = true;
            if (config[2]) this.customFunctionLookup[config[1]] = true;
            DOMHelper.appendChild(parent, option);
        })
    }

    @BindThis
    public filterList(e: any): void {
        const filterKey = e.target!.value;
        if (this.customFunctionLookup[filterKey]) store.dispatch(updateFilterWithCustomFunction(filterKey));
        else if (filterKey === 'all') store.dispatch(changeFilter(''));
        else store.dispatch(changeFilter(filterKey));
    }


}

export default FilterSelect;