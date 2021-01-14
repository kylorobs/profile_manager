import { store } from "../../app";
import { BindThis } from "../../decorators/bindthis";
import { changeFilter } from "../../state/ProfileSlice";

class DropArea {
    title: string;
    id: string;
    element: any;

    constructor(n: string, i:string){
        this.title = n;
        this.id = i;
        this.element = this.createElement();
    }

    createElement(){
        const block = document.createElement('div') as HTMLDivElement;
        block.classList.add('droppable');
        block.id = this.id;
        block.innerHTML = `<h2>${this.title}</h2>`;
        block.addEventListener('click', this.filterList);
        return block;
    }

    @BindThis
    filterList(){
        store.dispatch(changeFilter(this.id))
    }

    
}

export default DropArea;