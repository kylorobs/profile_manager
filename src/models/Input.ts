import DOMHelper from "../utils/DOMHelper";
import { FormElements, KeyMap } from '../types/types';

export abstract class Input {
    public el: FormElements;
    constructor(public value: string, public keymap: KeyMap, private isRequired: boolean = false) {
        this.el = this.createElement(keymap);
    }

    appendToDOM(el: FormElements, inputTitle: string, parentID: string): void{
        const label = DOMHelper.create('label');
        const content  = this.isRequired ? `${inputTitle} <sup style="color:red">*</sup>` : inputTitle
        DOMHelper.appendChild(label, content)
        const div = DOMHelper.createDivHTML(undefined, label);
        div.appendChild(el);
        DOMHelper.appendChild(`#${parentID}`, div)
    }

    abstract createElement(keyMap: KeyMap): FormElements;
    abstract changeHandler(e: any): void;
}