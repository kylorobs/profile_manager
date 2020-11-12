
import { Profile } from '../../models/Profile';
import { store } from '../../app';
// import Render from '../Render/Render';
// import Render from '../Render/Render';
import Card from '../Card/Card';
import {BindThis} from '../../decorators/bindthis';


class List {
    title: string;
    filterval: string;
    profiles: Profile[];
    
    constructor(){
        this.title = 'All Artists';
        this.filterval = '';
        this.profiles = store.getState().profiles;
        this.filterProfiles();
        store.subscribe(this.filterProfiles)
    }

    @BindThis
    filterProfiles():Card[]{
        this.clearList();
        this.profiles = store.getState().profiles;
        return this.profiles.map(prof=> {
            return new Card(prof.name, prof.id, prof.url, false)
        })
    }

    clearList(){
        const parent = document.querySelector('.list')!;
        parent.innerHTML ='';
    }

}

export default List;


  