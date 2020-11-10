import Column  from '../Column/Column';
// import Render from '../Render/Render';
import { ColumnInfo } from '../../types/types';


class ProfileManager {

    private columns: ColumnInfo[];

    constructor(c: ColumnInfo[], f: string){
        this.columns = c;
        console.log(f)
        this.setupColumns();
    }

    setupColumns(){
        const cols = this.columns.map((col: string[]) => {
            return new Column(col[0], col[1]);
        })
        console.log(cols)
        // Render.renderColumns(cols)
    }
}

export default ProfileManager;