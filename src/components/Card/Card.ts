import {store} from '../../app';
import { BindThis } from '../../decorators/bindthis';
import { edit } from '../../state/FormSlice';
import { Draggable } from '../../types/types';

class Card implements Draggable {
    title: string;
    image: string;
    subtext: string;
    id: string;
    parent: any;
    element: any;

    constructor(t: string, i: string, im: string, sub: string){
        this.title = t;
        this.id = i;
        this.image = im;
        this.subtext = sub;
        const card = this.buildCard();
        card.addEventListener('click', (e) => this.clickHandler(e));
        this.element = card;
    }

    buildCard(){
        const label: HTMLLabelCardElement = document.createElement('label-card');
        label.cardtitle = this.title;
        if (this.image) label.image = this.image;
        if (this.subtext) label.text = this.subtext;
        label.margin = '1em 0 1em 15px';
        label.cardwidth = '90%';
        label.smallestheight = !!!this.subtext;
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