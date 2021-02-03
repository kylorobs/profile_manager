
import {Profile} from '../../models/Profile';
import DOMPurify from 'dompurify';

function fetchParent(classname: string){
    return document.querySelector(`${classname}`)
}

interface T extends HTMLElement {};

class DOMHelper {
    static renderList(parent: T, ar: T[]){
        console.log(parent, ar);
    }

    static renderInnerHTML(parentId: string, el: string, allowedTags: string[] = []){
        console.log(parentId, el);
        const options = {} as { ADD_TAGS?: string[] };
        if (allowedTags.length > 0) options.ADD_TAGS = [...allowedTags] 
        document.querySelector(parentId)!.innerHTML = DOMPurify.sanitize(
            el,
            options
        );    
    }

    static createDivHTML(str?: string):HTMLDivElement {
        const div = document.createElement('div');
        if (str) div.innerHTML = DOMPurify.sanitize(str);
        return div;
    }

    static sanitise(str: string):string { return DOMPurify.sanitize(str)}


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
}

export default DOMHelper;