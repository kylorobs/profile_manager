
import { Profile } from '../../models/Profile';
import { store } from '../../app';
import {RootState} from '../../app';
import { edit } from '../../state/ProfileSlice';


class Column {
    title: string;
    filterval: string;
    profiles: Profile[];
    
    constructor(t: string, f: string){
        this.title = t;
        this.filterval = f;
        store.subscribe(this.filterProfiles);
        const state: RootState = store.getState().profiles;
        this.profiles = state
        const bt = document.querySelector('button')!;
        bt.addEventListener('click', this.edit);
    }

    filterProfiles(){
        console.log('filterProfiles method fired');
    }

    edit(e: Event){
        e.preventDefault();
        store.dispatch(edit())
    }
}

export default Column;