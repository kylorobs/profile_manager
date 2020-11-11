
import { Profile } from '../../models/Profile';
import { store } from '../../app';
// import Render from '../Render/Render';



class List {
    title: string;
    filterval: string;
    profiles: Profile[];
    
    constructor(){
        this.title = 'All Artists';
        this.filterval = '';
        this.profiles = [];
        this.filterProfiles();
    }

    filterProfiles():void{
        this.profiles = store.getState().profiles.filter((profile: Profile) => profile.type === this.filterval);
        this.renderProfiles();
    }

    renderProfiles(): void{
        // const gridCol = document.getElementById(this.filterval);
        // Render.renderProfiles(this.profiles, )
    }
}

export default List;