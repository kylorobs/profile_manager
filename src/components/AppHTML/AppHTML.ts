import { store } from "../../app";
import { Component } from "../../models/Component";
import { setError } from "../../state/ProfileSlice";
import DOMHelper from "../../utils/DOMHelper";
import { html_ids } from "../../utils/htmlIds";


class AppHTML extends Component<HTMLDivElement>{
    title: string;
    el: HTMLDivElement;

    constructor(pageTitle: string) {
        super();
        this.title = pageTitle;
        this.el = document.getElementById(html_ids.app)! as HTMLDivElement;
        this.createElement();
    }

    createElement(): HTMLDivElement {
        if (this.el) {
            const formTags = ['kclsu-modal'];
            DOMHelper.appendChild(this.el, `
                <kclsu-modal show="false"></kclsu-modal>
                <div class="area">
                    <div class="apptitle"><h1>${this.title}</h1></div>
                    <div class="appmenu">
                        <div class="menuIcon" id="back"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.503 45.503" version="1.0"><defs><radialGradient id="b" gradientUnits="userSpaceOnUse" cy="32.797" cx="28.935" gradientTransform="translate(-3.8 6.8)" r="22" fx="28.935" fy="32.797"><stop stop-color="#e6cf00" offset="0"/><stop stop-color="#fde94a" offset="1"/></radialGradient><radialGradient id="c" gradientUnits="userSpaceOnUse" cy="32.797" cx="28.935" gradientTransform="translate(-3.8 6.8)" r="22" fx="28.935" fy="32.797"><stop stop-color="#e6cf00" offset="0"/><stop stop-color="#fde94a" offset="1"/></radialGradient><radialGradient id="d" gradientUnits="userSpaceOnUse" cy="32.797" cx="28.935" gradientTransform="translate(-3.8 6.8)" r="22" fx="28.935" fy="32.797"><stop stop-color="#e6cf00" offset="0" style="stop-color:#e6ce00;stop-opacity:1"/><stop stop-color="#fde94a" offset="1"/></radialGradient><radialGradient id="e" gradientUnits="userSpaceOnUse" cy="32.797" cx="28.935" gradientTransform="translate(-3.8 6.8)" r="22" fx="28.935" fy="32.797"><stop stop-color="#e6cf00" offset="0"/><stop stop-color="#fde94a" offset="1"/></radialGradient><radialGradient xlink:href="#d" id="f" gradientUnits="userSpaceOnUse" gradientTransform="translate(78.2 6.8)" cx="28.935" cy="32.797" fx="28.935" fy="32.797" r="22"/><linearGradient id="a" y2="34.826" gradientUnits="userSpaceOnUse" x2="24.031" y1="7.024" x1="14.66"><stop stop-color="#fcf9fb" offset="0"/><stop stop-color="#fcf9fb" stop-opacity="0" offset="1"/></linearGradient></defs><g style="display:inline"><path transform="matrix(-1 0 0 1 45.482 -1.899)" d="M44.718 24.65c0 12.143-9.844 21.987-21.987 21.987C10.587 46.637.743 36.793.743 24.65c0-12.143 9.844-21.987 21.988-21.987 12.143 0 21.987 9.844 21.987 21.987z" style="color:#000;fill:url(#f);fill-opacity:1;fill-rule:nonzero;stroke:#000;stroke-width:1.528;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate"/><path style="opacity:.68999999;color:#000;fill:none;stroke:#fff;stroke-width:1.52835596;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" d="M44.718 24.65c0 12.143-9.844 21.987-21.987 21.987C10.587 46.637.743 36.793.743 24.65c0-12.143 9.844-21.987 21.988-21.987 12.143 0 21.987 9.844 21.987 21.987z" transform="matrix(-.93194 0 0 .93194 43.979 -.203)"/></g><g style="display:inline"><path style="color:#000;fill:#daa900;fill-opacity:1;fill-rule:nonzero;stroke:#000;stroke-width:1.528;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0;marker:none;visibility:visible;display:inline;overflow:visible;enable-background:accumulate" d="M24.244 37.126a13.121 13.121 0 0 1-9.938-5.188l3.782-2.875c1.533 2.023 3.954 3.344 6.687 3.344 4.637 0 8.406-3.77 8.406-8.406 0-4.637-3.769-8.406-8.406-8.406-2.386 0-4.532 1.023-6.062 2.625.702.65 1.376 1.268 1.906 1.75l-10.531 4.468 2.843-11.5c1.085.985 1.503 1.382 2.282 2.094a12.82 12.82 0 0 1 1.625-1.5c5.774-4.386 14.02-3.243 18.406 2.531 4.386 5.775 3.243 14.02-2.531 18.407a13.08 13.08 0 0 1-8.47 2.656z" transform="translate(-1.249 -1.249)"/></g></svg></div>
                        <div class="menuIcon" id="upload_data"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 100 100"><path d="M69.271 42.085 51.447 20.671c-.437-.524-.951-.715-1.447-.681-.496-.034-1.011.157-1.447.681L30.729 42.085c-1.1 1.319-.461 3.494 1.446 3.494h7.479v32.386c0 1.116.931 2.047 2.047 2.047h16.598a2.066 2.066 0 0 0 2.047-2.047V45.579h7.479c1.907 0 2.546-2.175 1.446-3.494z"/><path d="M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0zm0 92C26.804 92 8 73.195 8 50 8 26.804 26.804 8 50 8c23.195 0 42 18.804 42 42 0 23.195-18.805 42-42 42z"/></svg></div>
                        <div class="menuIcon" id="add"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4 7v2h3v3h2V9h3V7H9V4H7v3zm4 9c-4.418 0-8-3.58-8-8s3.582-8 8-8 8 3.58 8 8-3.582 8-8 8z" fill-rule="evenodd"/></svg></div>
                    </div>
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

