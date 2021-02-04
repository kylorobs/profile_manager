import DOMHelper from "../components/DOMHelper/DOMHelper";


export abstract class Input<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement > {
    constructor(public value: string, public el: T | {value: 'unset'}) {}

    appendToDOM(el: T, inputTitle: string, parentID: string): void{
        const label = DOMHelper.create('label', inputTitle)
        const div = DOMHelper.createDivHTML(undefined, label);
        div.appendChild(el);
        DOMHelper.renderInnerHTML(`#${parentID}`, div)
    }

    abstract createElement(): T;
    abstract changeHandler(e: any): void;
}