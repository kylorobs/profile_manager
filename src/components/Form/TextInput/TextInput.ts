import { Input } from '../../../models/Input';
import { KeyMap, FormElements } from '../../../types/types';
import { BindThis } from '../../../decorators/bindthis';
import DOMHelper from '../../../utils/DOMHelper';


class TextInput extends Input {

    constructor(public parentId: string, public keymap: KeyMap, protected valid: boolean = false, public title: any = '') {
        super('', keymap, keymap.validationTypes.includes('isRequired'));
        this.title = keymap.keyName;
        if (document.getElementById(parentId)) this.appendToDOM(this.el, this.keymap.inputTitle, parentId);
    }

    createElement(keymap: KeyMap): FormElements {
        let el: any;

        switch (keymap.type) {
            case 'input':
                el = DOMHelper.create<HTMLInputElement>('input');
                break;
            case 'datetime':
                el = DOMHelper.create<HTMLInputElement>('input');
                el.type = "datetime-local";
                break;
            case 'textarea':
                el = DOMHelper.create<HTMLTextAreaElement>('textarea');
                el.cols = 22;
                el.rows = 8;
                break;
            case 'select':
                el = DOMHelper.create<HTMLSelectElement>('select');
                keymap.options?.map(optionKey => {
                    const option = DOMHelper.create<HTMLOptionElement>('option');
                    option.innerText = optionKey[0];
                    option.value = encodeURIComponent(optionKey[1]);
                    return option;
                })
                    .forEach(option => el.appendChild(option))
                break;
            default: el = DOMHelper.create<HTMLInputElement>('input');
        }

        if (keymap.disabled) {
            el.disabled = true;
            el.dataset.updateOnly = 'true';
        }

        el.id = keymap.keyName;
        el.placeholder = keymap.inputDefaultText;
        el.addEventListener('change', this.changeHandler);
        if (keymap.validationTypes.includes('isRequired')) {
            el.required = true;
        }
        return el;
    }

    @BindThis
    changeHandler(): void {
        this.el.style.border = '';
    }


}

export default TextInput;