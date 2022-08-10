import { Component } from "../../models/Component";
import DOMHelper from "../../utils/DOMHelper";


export type AlertTypes = 'warning' | 'success' | 'failure';

class Alert extends Component<HTMLDivElement> {

    public el;
    public msgEl;
    private currentType: AlertTypes;

    constructor(public parentId: string) {
        super();
        this.currentType = 'success';
        this.el = this.createElement();
        this.el.classList.add('manager-alertbox')
        const p = DOMHelper.create('p');
        this.msgEl = p;
        DOMHelper.appendChild(this.el, p);
        document.getElementById('editor')?.insertAdjacentElement('afterbegin', this.el)
    }

    createElement(): HTMLDivElement {
        const div = DOMHelper.create<HTMLDivElement>('div');
        return div;
    }

    setType(type: AlertTypes) {
        this.el.classList.remove(this.currentType);
        this.el.classList.add(`manager-${type}`);
        this.currentType = type;
    }

    showAlert(type: AlertTypes, message: string) {
        this.el.style.display = 'flex';
        this.setType(type);
        this.msgEl.innerText = message;
    }

    hideAlert() {
        this.el.style.display = 'none';
    }


}

export default Alert;