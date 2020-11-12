import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Render from '../Render/Render';
import Form from '../Form/Form';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {fetchProfiles} from '../../state/ProfileSlice';



class ProfileManager {

    private areas: Categories[];
    private list: List;


    constructor(c: Categories[], f: string){
        store.dispatch(fetchProfiles());
        this.areas = c;
        console.log(f);
        this.list = new List()
        this.setupAreas();
        new Form();
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