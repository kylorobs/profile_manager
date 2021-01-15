import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Form2 from '../Form/Form2';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {updateFilterKey} from '../../state/ProfileSlice';
import {fetchData} from '../../state/ProfileSlice';
import { ManagerInit, KeyMap } from '../../models/InputKeys';


class ProfileManager {

    private areas: Categories[];
    private list: List;


    constructor(Manager: ManagerInit){
        store.dispatch(fetchData('https://test-db-1577e.firebaseio.com/artists.json'));
        this.areas = Manager.categories;
        this.list = new List(Manager.categories);
        this.setupAreas();
        this.createForms(Manager.keyMapping);
        store.dispatch(updateFilterKey(Manager.categoryKeyName));
    }

    createForms(keyMapping: KeyMap[]){
        new Form2(keyMapping);
    }

    setupAreas(){
        //CREATE DRAG AND DROP AREAS
        const areas = this.areas.map((col: string[]) => {
            return new DropArea(col[0], col[1]);
        })
        const parent = document.querySelector('.droparea')!;
        areas.forEach(area => {
           parent.appendChild(area.element);
        })
        console.log(this.list)
    }


}

export default ProfileManager;