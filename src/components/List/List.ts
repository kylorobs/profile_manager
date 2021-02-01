
import { Profile } from '../../models/Profile';
import { store } from '../../app';
import Card from '../Card/Card';
import {BindThis} from '../../decorators/bindthis';
import ListFilter from './ListFilter/ListFilter';
import { Categories, filterFn } from '../../types/types';


class List {
    title: string;
    filterKey: string; 
    private filterNames: Categories[];
    profiles: Profile[];
    private searchContainer: HTMLKclsuSearchElement;
    private filterControls: ListFilter;
    private cardKeys: [string, string, string];
    
    constructor(filterNames: Categories[], filterKey: string, cardKeys: [string, string, string]){
        this.title = 'All Artists';
        this.filterKey = filterKey; 
        this.cardKeys = cardKeys;
        this.profiles = store.getState().data.profiles;
        this.searchContainer = document.createElement('kclsu-search') as HTMLKclsuSearchElement;
        this.filterNames = filterNames;
        this.searchContainer.attr = 'cardtitle';
        this.searchContainer.containerselector = 'label-card';
        this.searchContainer.style.overflow = 'scroll';
        this.updateList();
        this.filterControls = new ListFilter(store.getState().data.filterid);
        document.querySelector('.list')!.appendChild(this.filterControls.el);

        store.subscribe(this.updateList);
    }

    @BindThis
    async updateList(){
        const profiles = await store.getState().data.profiles;
        const currentFilter = await store.getState().data.filterid;
        const categoryFilterFunctionId = await store.getState().data.filterWithCustomFunction;
        let filterFunction = null as filterFn;
        let filterName = '';

        if (categoryFilterFunctionId){
            const category = this.filterNames.find((category: Categories) => category[1] === categoryFilterFunctionId);
            if (category) {
                filterFunction = category[2];
                filterName = category[0]; 
            }
        }
        const matchingFilter = this.filterNames.find(filter => filter[1] === currentFilter);
        if (matchingFilter) filterName = matchingFilter[0];
        this.clearList();
        this.updateFilter(filterName);
        if (!store.getState().data.error) this.createCards(profiles, currentFilter, filterFunction);
    }

    @BindThis
    createCards(profiles: Profile[], currentFilter: string, customFilter: filterFn ):void{
        document.querySelector('.list')!.appendChild(this.searchContainer);
        const [image, heading, subtext] = this.cardKeys;
        //Default Filter function passed into .filter() function
        const filterByCategory = (prof: Profile) => {
            if (!currentFilter) return true;
            return prof[this.filterKey]  === currentFilter;
        };

        if (this.searchContainer.shadowRoot){
        profiles
            .filter(customFilter || filterByCategory)
            .map(prof=> {
                return new Card(prof[heading], prof.id, prof[image], prof[subtext]);
            }).forEach(card => this.searchContainer.appendChild(card.element));

        this.searchContainer!.shadowRoot!.querySelector('div')!.style.height = 'auto';
        this.searchContainer!.shadowRoot!.querySelector('div')!.style.width = '90%';
        this.searchContainer!.shadowRoot!.querySelector('div')!.style.margin = 'auto';
        }
    }

    updateFilter(currentFilter: string){
        this.filterControls.updateFilter(currentFilter);
    }


    clearList(){
        this.searchContainer.innerHTML = '';    
    }

}

export default List;


  