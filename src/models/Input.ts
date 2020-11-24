

export abstract class Input<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement > {
    constructor(public value: string, public el: T | {value: 'unset'}) {}

    appendToDOM(el: T, inputTitle: string, parentID: string): void{
        const parent = document.getElementById(parentID)!;
        const label = document.createElement('label') as HTMLLabelElement;
        label.innerText = inputTitle;
        const div = document.createElement('div');
        div.appendChild(label);
        div.appendChild(el);
        parent.appendChild(div);
    }

    abstract createElement(): T;
    abstract changeHandler(e: any): void;
    // abstract updateValue(val: string): void;
}