
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

    //Render HTML strings / elements to a parent node
    static renderInnerHTML(parentId: string|HTMLElement, el: string|HTMLElement, allowedTags: string[] = [], allowedAttr: string[] = []){
        const parent =  typeof parentId ==='string' ? 
            document.querySelector(parentId)!
            :
            parentId;
        const options = {} as { ADD_TAGS?: string[], ALLOWED_ATTR: string[] };
        if (allowedTags.length > 0) options.ADD_TAGS = allowedTags; 
        if (allowedAttr.length >0) options.ALLOWED_ATTR = allowedAttr
        if ( el && typeof el !== 'string') parent.appendChild(el);    
        else {
            console.log('RENDER IMAGE');
            console.log(DOMPurify.sanitize(
                el,
                options
            ))
            parent.innerHTML = DOMPurify.sanitize(
            el,
            options
        );  
            }
          
    }

    //Create a Div Container with containing elements or HTML strings
    static createDivHTML(str?: string, el?:HTMLElement, id?:string):HTMLDivElement {
        const div = document.createElement('div');
        if (id) div.id = id;
        if (str) div.innerHTML = DOMPurify.sanitize(str);
        if (el) div.appendChild(el);
        return div;
    }

    //create a basic flex container 
    static createFlexContainer(x: string, y: string, wrap: boolean, str?: string, el?:HTMLElement):HTMLFlexContainerElement {
        const flex = document.createElement('flex-container') as HTMLFlexContainerElement;
        if (x) flex.alignx = x;
        if (y) flex.aligny = y;
        if (wrap) flex.wrap = true;
        if (str) flex.innerHTML = DOMPurify.sanitize(str);
        if (el) flex.appendChild(el);
        return flex;
    }

    //create a new element 
    static create<T extends HTMLElement>(elType:string, innerText?:string):T{
        const el = document.createElement(elType) as T;
        if (innerText) el.innerHTML = innerText;
        return el;
    }

    static appendChildren(parent:HTMLElement, children: HTMLElement[] = []):void{
        if (children.length > 0) children.forEach((child: HTMLElement) => parent.appendChild(child));
    }   

    //Return a sanitised string
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