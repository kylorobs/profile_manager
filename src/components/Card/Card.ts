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
    element: HTMLLabelCardElement | HTMLTextCardElement;

    constructor(t: string, i: string, im: string, sub: string, cardType: 'label-card' | 'text-card'){
        this.title = t;
        this.id = i;
        this.image = im;
        this.subtext = sub;
        this.element = cardType === 'label-card'? this.buildLabelCard() : this.buildTextCard();
        this.element.addEventListener('click', (e) => this.clickHandler(e));
        this.element.addEventListener('dragstart', this.dragStartHandler);
    }

    private buildLabelCard():HTMLLabelCardElement {
        const card = DOMHelper.create<HTMLLabelCardElement>('label-card');
        card.cardtitle = this.title;
        card.margin = '15px 0';
        card.smallestheight = !!!this.subtext;
        card.smallheading = true;
        card.style.position = 'relative';
        if (this.image) card.image = this.image;
        if (this.subtext) card.text = this.subtext;
        return card;
    }

    private buildTextCard():HTMLTextCardElement {
        const card = DOMHelper.create<HTMLTextCardElement>('text-card');
        card.cardtitle = this.title;
        card.subtext = this.subtext;
        card.style.position = 'relative';        
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
        console.log('dragend');
    }
}

export default Card;