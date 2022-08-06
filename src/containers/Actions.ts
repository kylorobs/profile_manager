import { store } from "../app";
import { BindThis } from "../decorators/bindthis";
import { resetEditMode } from "../state/FormSlice";


class Actions {

    public addBtn: HTMLDivElement;
    public resetBtn: HTMLDivElement;
    public uploadBtn: HTMLDivElement;

    constructor(updateOnly: boolean) {

        this.resetBtn = document.getElementById('back')! as HTMLDivElement;
        this.uploadBtn = document.getElementById('upload_data')! as HTMLDivElement;
        this.addBtn = document.getElementById('add')! as HTMLDivElement;

        if (!updateOnly) this.attachClickListener(this.addBtn, this.switchToEmptyForm)
        else this.addBtn.style.display = 'none';

        this.attachClickListener(this.resetBtn, this.switchToEmptyForm)

        store.subscribe(this.setEditingState);
    }

    attachClickListener(el: HTMLDivElement, listener: () => void) {
        el.addEventListener('click', listener);
    }


    // New Form Handler Function
    @BindThis
    switchToEmptyForm() {
        store.dispatch(resetEditMode());
    }

    // Check for an editID or Loading boolean in global state. 
    // Set values if editId exists
    @BindThis
    private setEditingState(): void {
        const editId = store.getState().form.editing_id;
        if (editId) this.resetBtn.style.display = "block";
        else this.resetBtn.style.display = "none";
    }


}

export default Actions;