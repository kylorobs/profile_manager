
import { Profile } from '../types/types';
import { store } from '../app';
import Card from '../components/Card/Card';
import { BindThis } from '../decorators/bindthis';
import ListControls from '../components/List/ListControls';
import { Filter, filterFn } from '../types/types';
import DOMHelper from '../utils/DOMHelper';
import { html_ids } from '../utils/htmlIds';
import { createDateString } from '../utils/functions'


class List {
    title: string;
    filterKey: string;
    private filterNames: Filter[];
    profiles: Profile[];
    private searchContainer: HTMLKclsuSearchElement;
    private filterControls: ListControls;
    private currentFilter: string;
    private categoryFilterFunctionId: string;
    private cardKeys: [string, string, string];
    private cardType: 'text-card' | 'label-card';

    constructor(filterNames: Filter[], filterKey: string, cardKeys: [string, string, string], cardType: 'text-card' | 'label-card') {
        this.title = 'All Artists';
        this.filterKey = filterKey;
        this.cardKeys = cardKeys;
        this.cardType = cardType;
        this.profiles = store.getState().data.profiles;
        this.currentFilter = store.getState().data.filterid;
        this.categoryFilterFunctionId = store.getState().data.filterWithCustomFunction;


        this.searchContainer = DOMHelper.create<HTMLKclsuSearchElement>('kclsu-search');
        this.filterNames = filterNames;
        //The search filter searches by the cardtitle attribute
        this.searchContainer.attr = 'cardtitle';
        this.searchContainer.containerselector = cardType;
        this.searchContainer.style.overflow = 'scroll';
        this.updateList();
        this.filterControls = new ListControls(filterNames, store.getState().data.filterid, store.getState().data.profiles.length);
        document.getElementById(html_ids.list)!.appendChild(this.filterControls.el);
        store.subscribe(this.updateList);
    }

    @BindThis
    async updateList() {
        const profiles = await store.getState().data.profiles;
        const currentFilter = await store.getState().data.filterid;
        const categoryFilterFunctionId = await store.getState().data.filterWithCustomFunction;

        //Do not update list if no changes in these properties
        if (this.profiles === profiles
            && this.currentFilter === currentFilter
            && this.categoryFilterFunctionId === categoryFilterFunctionId
            && this.profiles.length !== 0
        ) return;

        let filterFunction = null as filterFn;
        let filterName = '';

        if (categoryFilterFunctionId) {
            const category = this.filterNames.find((category: Filter) => category[1] === categoryFilterFunctionId);
            if (category) {
                filterFunction = category[2];
                filterName = category[0];
            }
        };

        const matchingFilter = this.filterNames.find(filter => filter[1] === currentFilter);
        if (matchingFilter) filterName = matchingFilter[0];
        this.clearList();
        this.updateFilter(filterName, this.createCards(profiles, currentFilter, filterFunction));
        // if (!store.getState().data.error) this.createCards(profiles, currentFilter, filterFunction);

        //Set the fetched profiles to the profiles property 
        this.profiles = profiles;
        this.currentFilter = currentFilter;
        this.categoryFilterFunctionId = categoryFilterFunctionId;
    }

    @BindThis
    createCards(profiles: Profile[], currentFilter: string, customFilter: filterFn): number {
        document.getElementById(html_ids.list)!.appendChild(this.searchContainer);
        const [image, heading, subtext] = this.cardKeys;
        let count = 0;

        //Default Filter function passed into .filter() function
        const filterByCategory = (prof: Profile) => {
            if (!currentFilter) return true;
            return prof[this.filterKey] === currentFilter;
        };

        if (this.searchContainer.shadowRoot) {
            profiles
                .filter(customFilter || filterByCategory)
                .map(prof => {
                    // Check if the property is a date or time stamp. If so, convert to a string.
                    let containsDateTime = subtext.toLowerCase().includes('date') || subtext.toLowerCase().includes('time');
                    let text = containsDateTime ? createDateString(prof[subtext]) : prof[subtext];

                    return new Card(prof[heading], prof.id, prof[image], text, this.cardType);
                })
                .forEach(card => {
                    this.searchContainer.appendChild(card.element);
                    count++;
                });
        }

        return count;
    }

    updateFilter(currentFilter: string, resultsCount: number) {
        this.filterControls.updateFilter(currentFilter, resultsCount);
    }


    clearList() {
        this.searchContainer.innerHTML = '';
    }

}

export default List;


