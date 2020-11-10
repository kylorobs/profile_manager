import Column  from '../Column/Column';
import Render from '../Render/Render';
import State from '../State/State';
import { ColumnInfo } from '../../types/types';


class ProfileManager {

    private columns: ColumnInfo[];
    private filterProperty: string;
    private state: State;


    constructor(c: ColumnInfo[], f: string){
        this.columns = c;
        this.filterProperty = f;
        this.state = new State();
    }

    setupColumns(){
        const cols = this.columns.map((col: string[]) => {
            return new Column(col[0], col[1]);
        })

        Render.renderColumns(cols)
    }
}

export default ProfileManager;