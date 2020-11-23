import { Input } from '../../../models/Input';
import { KeyMap } from '../../../models/InputKeys';
import {BindThis} from '../../../decorators/bindthis';
import { validateInput } from '../../../utility/utility';


class TextInput extends Input<HTMLInputElement | HTMLTextAreaElement>{
    constructor(private parentId: string, public type: string, private keymap: KeyMap, protected valid: boolean = false){
        super('', parentId, null);
        this.createElement();
    }

    createElement(){
        let el;
        const keymap = this.keymap;
        switch(this.type){
            case 'input' :
                el = document.createElement('input') as HTMLInputElement;
            case 'text':
                el = document.createElement('textarea') as HTMLTextAreaElement;
                el.cols = 22;
                el.rows = 8;
            default: el = document.createElement('input') as HTMLInputElement;
        }
        
        el.id = keymap.keyName;
        el.placeholder = keymap.inputDefaultText;
        el.addEventListener('change', this.changeHandler);

        const label = document.createElement('label') as HTMLLabelElement;
        label.innerText = keymap.inputTitle;
        label.appendChild(el);
        this.el = el;
        return label;
    }

    @BindThis
    changeHandler(e: any): void{
        e.preventDefault();
        let isValid = true;
        this.keymap.validationTypes.forEach(type => {
            if(!validateInput(e.target.value, type)) isValid = false
        })
        if (isValid) this.valid = true;
        else this.valid = false;
    }

    // updateValue(val: string){
    //     this.value = val;
    //     this.el.
    // }

}

export default TextInput;