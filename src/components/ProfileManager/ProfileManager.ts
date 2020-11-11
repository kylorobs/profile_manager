import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Render from '../Render/Render';
import { ColumnInfo } from '../../types/types';


class ProfileManager {

    private areas: ColumnInfo[];
    private list: List;


    constructor(c: ColumnInfo[], f: string){
        this.areas = c;
        console.log(f);
        this.list = new List()
        this.setupAreas();
    }

    setupAreas(){
        const areas = this.areas.map((col: string[]) => {
            return new DropArea(col[0], col[1]);
        })
        console.log(areas)
        console.log(this.list)
        Render.renderAreas(areas)
    }
}

export default ProfileManager;