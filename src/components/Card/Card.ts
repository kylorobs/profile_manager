import {store} from '../../app';
import { edit } from '../../state/ProfileSlice';

class Card {
    title: string;
    image: string;
    id: string;
    active: boolean;
    parent: any;
    element: any;

    constructor(t: string, i: string, im: string, a: boolean, parent: any){
        this.title = t;
        this.id = i;
        this.parent = parent;
        this.image = im;
        this.active = a;
        const card = this.buildCard();
        card.addEventListener('click', (e) => this.clickHandler(e));
        //const container = this.buildContainer(card);
        this.element = card;
    }

    buildCard(){
        const label: HTMLLabelCardElement = document.createElement('label-card');
        label.cardtitle = this.title;
        label.image = this.image;
        label.margin = '1em 0 1em 15px';
        label.cardwidth = '90%';
        label.smallestheight = true;
        label.smallheading = true;
        label.style.position = 'relative';
        return label;
    }

    buildContainer(card: HTMLLabelCardElement){
        const container: HTMLFlexContainerElement = document.createElement('flex-container');
        container.alignx="space-between";
        container.aligny="center";
        container.appendChild(card);
        container.classList.add('fullcard');
        return container;
    }

    clickHandler(e: Event){
        e.preventDefault();
        store.dispatch(edit(this.id));
    }

    dropHandler(id:string){
        console.log('Ready to Drop!')
        console.log(id)
    }
}

export default Card;