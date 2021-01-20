
import { Profile } from '../../models/Profile';
import { store } from '../../app';
import Card from '../Card/Card';
import {BindThis} from '../../decorators/bindthis';
import ListFilter from './ListFilter/ListFilter';
import { Categories } from '../../types/types';


class List {
    title: string;
    filterKey: string; 
    private filterNames: Categories[];
    profiles: Profile[];
    private searchContainer: HTMLKclsuSearchElement;
    private filterControls: ListFilter;
    
    constructor(filterNames: Categories[]){
        this.title = 'All Artists';
        this.filterKey = 'type'; // change this so it is set via main class.
        this.profiles = store.getState().data.profiles;
        this.searchContainer = document.createElement('kclsu-search') as HTMLKclsuSearchElement;
        this.filterNames = filterNames;
        this.searchContainer.attr = 'cardtitle';
        this.searchContainer.containerselector = 'label-card';
        // this.searchContainer.style.position = 'absolute';
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

        let filterName = '';
        const matchingFilter = this.filterNames.find(filter => filter[1] === currentFilter);
        if (matchingFilter) filterName = matchingFilter[0];
        this.clearList();
        this.updateFilter(filterName);
        if (!store.getState().data.error) this.createCards(profiles, currentFilter);
    }

    @BindThis
    createCards(profiles: Profile[], currentFilter: string):void{
        document.querySelector('.list')!.appendChild(this.searchContainer);
        if (this.searchContainer.shadowRoot){
        profiles
            .filter(prof => {
                if (!currentFilter) return true;
                return prof[this.filterKey]  === currentFilter;
            })
            .map(prof=> {
                return new Card(prof.name, prof.id, prof.url, false, document.querySelector('.list'));
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


  