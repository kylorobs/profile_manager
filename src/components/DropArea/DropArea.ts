import { store } from "../../app";
import { BindThis } from "../../decorators/bindthis";
import { changeFilter} from "../../state/ProfileSlice";
import { DragTarget } from "../../types/types";
import * as thunks from '../../state/thunks/profile';

class DropArea implements DragTarget {
    title: string;
    id: string;
    element: any;

    constructor(n: string, i:string){
        this.title = n;
        this.id = i;
        this.element = this.createElement();
    }

    static removeClickedClass(){
        const dropTargets = document.querySelectorAll('.droppable');
        dropTargets.forEach(target => {
            if (target.classList.contains('dropActive')) target.classList.remove('dropActive');
            if (!target.classList.contains('dropNeutral')) target.classList.add('dropNeutral');
        });
    }

    createElement(){
        const block = document.createElement('div') as HTMLDivElement;
        block.classList.add('droppable');
        block.classList.add('dropNeutral');
        block.id = this.id;
        block.innerHTML = `<h3>${this.title}</h3>`;
        block.addEventListener('click', this.filterList);
        block.addEventListener('drop', this.dropHandler);
        block.addEventListener('dragover', this.dragOverHandler);
        block.addEventListener('dragleave', this.dragLeaveHandler);
        return block;
    }

    @BindThis
    filterList(){
        DropArea.removeClickedClass();
        this.element.classList.add('dropActive');
        store.dispatch(changeFilter(this.id));
    }

    @BindThis
    dragOverHandler(evt: DragEvent){
        if (evt.dataTransfer && evt.dataTransfer.types[0] === 'text/plain'){
            evt.preventDefault();
            this.element.classList.add('dropActive');
            this.element.classList.remove('dropNeutral');
        }
    }

    @BindThis
    dropHandler(evt: DragEvent){

        const id = evt.dataTransfer!.getData('text/plain');
        const val = this.id;
        this.filterList();
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
        this.element.classList.add('dropNeutral');
        this.element.classList.remove('dropActive');
    }

    
}

export default DropArea;