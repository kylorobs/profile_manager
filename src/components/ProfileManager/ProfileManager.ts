import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Render from '../Render/Render';
import Form2 from '../Form/Form2';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {fetchProfiles} from '../../state/ProfileSlice';
import { ManagerInit } from '../../models/InputKeys';

class ProfileManager {

    private areas: Categories[];
    private list: List;


    constructor(Manager: ManagerInit){
        store.dispatch(fetchProfiles());
        this.areas = Manager.categories;
        this.list = new List()
        this.setupAreas();
        new Form2(Manager.keyMapping);
        // Render.renderList
    }

    setupAreas(){
        const areas = this.areas.map((col: string[]) => {
            return new DropArea(col[0], col[1]);
        })
        Render.renderAreas(areas);
        console.log(this.list)
    }
}

export default ProfileManager;