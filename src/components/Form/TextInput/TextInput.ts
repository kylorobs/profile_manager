import { Input } from '../../../models/Input';
import { KeyMap } from '../../../models/InputKeys';
import {BindThis} from '../../../decorators/bindthis';
import { validateInput } from '../../../utility/utility';

//  interface IIndexable {
//     [key: string]: any;
//   }

class TextInput extends Input<HTMLInputElement | HTMLTextAreaElement> {

    constructor(public parentId: string, public keymap: KeyMap, protected valid: boolean = false, public title: any = ''){
        super('', { value: 'unset' });
        this.title = keymap.keyName;
        this.keymap = keymap;
        this.appendToDOM(this.createElement(), this.keymap.inputTitle, parentId);
    }

    createElement(){
        let el;
        const keymap = this.keymap;
        switch(keymap.type){
            case 'input' :
                el = document.createElement('input') as HTMLInputElement;
            break;
            case 'textarea':
                console.log('correct')
                el = document.createElement('textarea') as HTMLTextAreaElement;
                el.cols = 22;
                el.rows = 8;
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
    changeHandler(e: any): void{
        e.preventDefault();
        let isValid = true;
        this.keymap.validationTypes.forEach(type => {
            if(!validateInput(e.target.value, type)) isValid = false
        })
        console.log(isValid)
        if (isValid) this.valid = true;
        else this.valid = false;
    }


}

export default TextInput;