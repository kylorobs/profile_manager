import DropArea from '../DropArea/DropArea';
import {Profile} from '../../models/Profile';

function fetchParent(classname: string){
    return document.querySelector(`${classname}`)
}

class Render {
    static renderAreas(ar: DropArea[]){
        console.log('RENDERING AREA')
        const parent = fetchParent('.droparea')!;
        ar.forEach(area => {
           const block = document.createElement('div') as HTMLDivElement;
           block.classList.add('droppable');
           block.id = area.id;
           block.innerHTML = `<h2>${area.title}</h2>`;
           parent.appendChild(block);
        })
    }

    static renderProfiles(ar: Profile[], id: string){
        const parent = document.getElementById(id)!;
        const cards = ar.map((profile: Profile) => {
            const label: HTMLLabelCardElement = document.createElement('label-card');
            label.title = profile.name;
            label.image = profile.image;
            // label.
        });
       cards.forEach((card:any) => parent.appendChild(card));
    }
    static renderLogin(){}
    static editor(){

    }
}

export default Render;