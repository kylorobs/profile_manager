import { store } from "../../app";
import { BindThis } from "../../decorators/bindthis";
import { changeFilter, updateCategory } from "../../state/ProfileSlice";
import { DragTarget } from "../../types/types";

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
        block.innerHTML = `<h2>${this.title}</h2>`;
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
        console.log('I HAVE BEEN DROPPED')
        console.log(evt.dataTransfer!.getData('text/plain'));
        const id = evt.dataTransfer!.getData('text/plain');
        const value = this.id;
        this.filterList();
        //UPDATE CATEGORY TYPE
        store.dispatch(updateCategory({id, value}))
    }

    @BindThis
    dragLeaveHandler(evt: DragEvent){
        console.log(evt);
        console.log('I have left');
        this.element.classList.add('dropNeutral');
        this.element.classList.remove('dropActive');
    }

    
}

export default DropArea;