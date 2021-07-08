import { store } from "../../app";
import { Component } from "../../models/Component";
import { setError } from "../../state/ProfileSlice";
import DOMHelper from "../../utils/DOMHelper";
import { html_ids } from "../../utils/htmlIds";


class AppHTML extends Component<HTMLDivElement>{
    title: string;
    el: HTMLDivElement;
    
    constructor(pageTitle:string){
        super();
        this.title = pageTitle;
        this.el = document.getElementById(html_ids.app)! as HTMLDivElement;
        this.createElement();
    }

    createElement():HTMLDivElement{
        if (this.el){
            const formTags = ['kclsu-modal'];
            DOMHelper.appendChild(this.el, `
                <kclsu-modal show="false"></kclsu-modal>
                <div class="area">
                    <h1>${this.title}</h1>
                    <div id="${html_ids.filters}"></div>
                </div>
                <div id="${html_ids.list}"></div>
                <div id="${html_ids.editor}">
                    <section id="${html_ids.formsection}">
                        <div id="${html_ids.fileinputs}"></div>
                        <div id="${html_ids.textinputs}">
                            <div id="${html_ids.formControls}"></div>
                        </div>
                    </section>
                </div> `,
                formTags)
        }
        else {
            store.dispatch(setError('No Div with parent ID APP displayed'));
        }
        return this.el;
    }
}

export default AppHTML;

