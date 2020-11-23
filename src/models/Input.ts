

export abstract class Input<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement > {
    constructor(public value: string, private parentID: string, protected el: T | null) {}
    appendToDOM(){
        const parent = document.getElementById(this.parentID)!
        if (this.el) parent.appendChild(this.el);
    }
    abstract createElement(): HTMLLabelElement;
    abstract changeHandler(e: any): void;
    // abstract updateValue(val: string): void;
}