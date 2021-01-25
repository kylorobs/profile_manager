import { Input } from '../../../models/Input';
import { KeyMap } from '../../../models/InputKeys';
import {BindThis} from '../../../decorators/bindthis';
import { Categories } from '../../../types/types';

//  interface IIndexable {
//     [key: string]: any;
//   }

class TextInput extends Input<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {

    constructor(public parentId: string, public keymap: KeyMap, protected valid: boolean = false, public title: any = ''){
        super('', { value: 'unset' });
        this.title = keymap.keyName;
        this.keymap = keymap;
        this.appendToDOM(this.createElement(), this.keymap.inputTitle, parentId);
    }

    createElement(){
        let el:any;
        const keymap = this.keymap;
        switch(keymap.type){
            case 'input' :
                el = document.createElement('input') as HTMLInputElement;
            break;
            case 'textarea':
                el = document.createElement('textarea') as HTMLTextAreaElement;
                el.cols = 22;
                el.rows = 8;
            break;
            case 'select':
                el = document.createElement('select') as HTMLSelectElement;
                keymap.options?.map((optionKey: Categories) => {
                    const option = document.createElement('option') as HTMLOptionElement;
                    option.innerText = optionKey[0];
                    option.value = optionKey[1];
                    return option;
                })
                .forEach(option => el.appendChild(option))
            break;
            default: el = document.createElement('input') as HTMLInputElement;
        }

        el.id = keymap.keyName;
        el.placeholder = keymap.inputDefaultText;
        el.addEventListener('change', this.changeHandler);
        this.el = el;
        return el;
    }

    @BindThis
    changeHandler(): void{

        
    }


}

export default TextInput;