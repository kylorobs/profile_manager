import {store} from '../../app';
import { BindThis } from '../../decorators/bindthis';
import { edit } from '../../state/ProfileSlice';
import { Draggable } from '../../types/types';

class Card implements Draggable {
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
        label.addEventListener('dragstart', this.dragStartHandler)
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

    @BindThis
    clickHandler(e: Event){
        e.preventDefault();
        store.dispatch(edit(this.id));
    }


    @BindThis
    dragStartHandler(evt: DragEvent){
        console.log('drag has started');
        console.log(evt);
        evt.dataTransfer!.setData('text/plain', this.id);
        evt.dataTransfer!.effectAllowed = 'move';
    }

    @BindThis
    dragEndHandler(_: DragEvent){
        console.log('dragend')
    }
}

export default Card;