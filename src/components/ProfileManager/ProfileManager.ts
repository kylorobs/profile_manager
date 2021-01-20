import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Form2 from '../Form/Form2';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {updateDataUrl, updateFilterKey} from '../../state/ProfileSlice';
import * as thunks from '../../state/thunks/profile';
import { ManagerInit, KeyMap } from '../../models/InputKeys';
import LoadingModal from '../Modal/LoadingModal/LoadingModal';


class ProfileManager {

    private areas: Categories[];
    private list: List;

    constructor(Manager: ManagerInit){
        store.dispatch(thunks.fetchData(`${Manager.dataUrl}.json`));
        store.dispatch(updateDataUrl(Manager.dataUrl));
        this.areas = Manager.categories;
        this.list = new List(Manager.categories);
        this.setupAreas();
        this.createForms(Manager.keyMapping);
        store.dispatch(updateFilterKey(Manager.categoryKeyName));
        new LoadingModal();
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