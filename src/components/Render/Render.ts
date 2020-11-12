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

    static renderProfiles(ar: Profile[]){
        const parent = fetchParent('.list')!;
        console.log('RENDERING PROFILES')
        console.log(ar)
        const cards = ar.map((profile: Profile) => {
            const label: HTMLLabelCardElement = document.createElement('label-card');
            label.cardtitle = profile.name;
            label.image = profile.url;
            label.margin = '1em 0';
            label.cardwidth = '85%';
            return label;
        });
        console.log(cards)
       cards.forEach((card:any) => parent.appendChild(card));
    }
    static renderLogin(){}
    static editor(){
        const form = fetchParent('#form') as HTMLFormElement;
        console.log(form)
    }
    static renderList(){
        // const data = 
    }
}

export default Render;