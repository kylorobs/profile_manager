import { store } from "../../app";
import { BindThis } from "../../decorators/bindthis";
// import { changeFilter, updateFilterWithCustomFunction} from "../../state/ProfileSlice";
import { DragTarget } from "../../types/types";
import * as thunks from '../../state/thunks/profile';
import DOMHelper from "../../utils/DOMHelper";

class FilterButton implements DragTarget {
    title: string;
    id: string;
    filterFn: boolean;
    el: HTMLDivElement;

    constructor(n: string, i:string, fn: boolean, clicked: (id:string) => void){
        this.title = n;
        this.filterFn = fn ;
        this.id = i;
        this.el = this.createElement(clicked);
    }

    //Create Div with Drag event listeners
    private createElement(clickedHandler: (id:string) => void): HTMLDivElement{
        const block = DOMHelper.createDivHTML(`<h3>${this.title}</h3>`);
        block.classList.add('droppable');
        block.classList.add('dropNeutral');
        block.id = this.id;
        block.addEventListener('click', () => clickedHandler(this.id));

        //IF NO CUSTOM FILTER FUNCTION SPECIFIED, APPLY DRAG N DROP EVENT LISTENERS
        if (!this.filterFn){
            block.addEventListener('drop', (evt: DragEvent) => this.dropHandler(evt, () => clickedHandler(this.id)));
            block.addEventListener('dragover', this.dragOverHandler);
            block.addEventListener('dragleave', this.dragLeaveHandler);
        }

        return block;
    }

    public addActiveClass(){
        if (!this.el.classList.contains('dropActive')) this.el.classList.add('dropActive');
    }

    public removeActiveClass(){
        if (this.el.classList.contains('dropActive')) this.el.classList.remove('dropActive');
        if (!this.el.classList.contains('dropNeutral')) this.el.classList.add('dropNeutral');
    }



    @BindThis
    dragOverHandler(evt: DragEvent){
        if (evt.dataTransfer && evt.dataTransfer.types[0] === 'text/plain'){
            evt.preventDefault();
            this.el.classList.add('dropActive');
            this.el.classList.remove('dropNeutral');
        }
    }

    @BindThis
    dropHandler(evt: DragEvent, cb: (id:string) => void){
        const id = evt.dataTransfer!.getData('text/plain');
        const val = this.id;
        cb(id);
        //UPDATE CATEGORY TYPE
        store.dispatch(thunks.updateCategory({
            url: store.getState().data.dataUrl,
            id: id, 
            val: val,
            category: store.getState().data.filterkey
        }))
    }

    @BindThis
    dragLeaveHandler(_: DragEvent){
        this.el.classList.add('dropNeutral');
        this.el.classList.remove('dropActive');
    }

    
}

export default FilterButton;