import { store } from "../app";
import FilterButton from "../components/FilterButton/FilterButton"
import { BindThis } from "../decorators/bindthis";
import { changeFilter, updateFilterWithCustomFunction } from "../state/ProfileSlice";
import { Filter } from "../types/types";
import DOMHelper from "../utils/DOMHelper";


class Filters {

    private filterButtons: FilterButton[];

    constructor(filterConfig: Filter[]){
        this.filterButtons = this.createFilterButtons(filterConfig);
    }

    private createFilterButtons(config: Filter[]): FilterButton[]{
        return config.map((item: Filter) => {
            return new FilterButton(item[0], item[1], !!item[2], this.filterList)
        })
    }


     @BindThis
     public filterList(id: string): void{
        this.filterButtons.forEach((btn: FilterButton) => {
            if (btn.id !== id) btn.removeActiveClass();
            else {
                btn.addActiveClass();
                if (btn.filterFn) store.dispatch(updateFilterWithCustomFunction(id));
                else store.dispatch(changeFilter(id));
            }
        });
     }


     private appendButtons(){
        //CREATE DRAG AND DROP AREAS
        const parent = document.querySelector('.droparea')!;
        if (this.filterButtons.length > 0)
            this.filterButtons.forEach((btn: FilterButton) => DOMHelper.appendChild('.droparea', btn.el));
        else 
            DOMHelper.appendChild('.droparea', '<p> You currently have no filters set up </p>');
        
    }
}
export default Filters;
