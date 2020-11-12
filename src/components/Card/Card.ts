import {store} from '../../app';
import { edit } from '../../state/ProfileSlice';

class Card {
    title: string;
    image: string;
    id: string;
    active: boolean;

    constructor(t: string, i: string, im: string, a: boolean){
        this.title = t;
        this.id = i;
        this.image = im;
        this.active = a;
        this.renderCard();
    }

    renderCard(){
        const card = this.buildCard();
        card.addEventListener('click', () => this.dropHandler(this.id));
        const container = this.buildContainer(card);
        const parent = document.querySelector('.list')!;
        parent.appendChild(container);
    }

    buildCard(){
        const label: HTMLLabelCardElement = document.createElement('label-card');
        label.cardtitle = this.title;
        label.image = this.image;
        label.margin = '1em 0';
        label.cardwidth = '85%';
        return label;
    }

    buildContainer(card: HTMLLabelCardElement){
        const container: HTMLFlexContainerElement = document.createElement('flex-container');
        container.alignx="space-between";
        container.aligny="center";
        container.appendChild(card);
        const x = document.createElement('h3');
        x.innerText = 'X';
        x.addEventListener('click', ((ev: Event) => this.clickHandler(ev, this.id)))
        container.appendChild(x);
        return container;
    }

    clickHandler(e: Event, id:string){
        e.preventDefault();
        console.log('clicked!')
        console.log(id)
        store.dispatch(edit(this.id))
    }

    dropHandler(id:string){
        console.log('Ready to Drop!')
        console.log(id)
    }
}

export default Card;