import {store} from '../../app';
import { BindThis } from '../../decorators/bindthis';
import { edit } from '../../state/FormSlice';
import { Draggable } from '../../types/types';
import DOMHelper from '../DOMHelper/DOMHelper';


class Card implements Draggable {
    title: string;
    image: string;
    subtext: string;
    id: string;
    element: HTMLLabelCardElement;

    constructor(t: string, i: string, im: string, sub: string){
        this.title = t;
        this.id = i;
        this.image = im;
        this.subtext = sub;
        const card = this.buildCard();
        this.element = card;
    }

    private buildCard():HTMLLabelCardElement {
        const card = DOMHelper.create<HTMLLabelCardElement>('label-card');
        card.cardtitle = this.title;
        card.margin = '1em 0 1em 15px';
        card.cardwidth = '90%';
        card.smallestheight = !!!this.subtext;
        card.smallheading = true;
        card.style.position = 'relative';
        if (this.image) card.image = this.image;
        if (this.subtext) card.text = this.subtext;

        card.addEventListener('click', (e) => this.clickHandler(e));
        card.addEventListener('dragstart', this.dragStartHandler);
        
        return card;
    }

    @BindThis
    private clickHandler(e: Event): void{
        e.preventDefault();
        store.dispatch(edit(this.id));
    }


    @BindThis
    dragStartHandler(evt: DragEvent): void{
        evt.dataTransfer!.setData('text/plain', this.id);
        evt.dataTransfer!.effectAllowed = 'move';
    }

    @BindThis
    dragEndHandler(_: DragEvent): void{
        console.log('dragend')
    }
}

export default Card;