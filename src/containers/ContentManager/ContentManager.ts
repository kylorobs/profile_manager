import List from '../../components/List/List';
import DropArea from '../../components/DropArea/DropArea'
import Form from '../../components/Form/Form';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {setError, updateDataUrl, updateFilterKey, setAuthentication} from '../../state/ProfileSlice';
import * as thunks from '../../state/thunks/profile';
import { ManagerInit} from '../../types/types';
import LoadingModal from '../../components/Modal/LoadingModal/LoadingModal';
import DOMHelper from '../../components/DOMHelper/DOMHelper';
import { BindThis } from '../../decorators/bindthis';
import ErrorModal from '../../components/Modal/ErrorModal/ErrorModal';

class ContentManager {

    app: HTMLElement;
    authenticated: boolean = false;
    public areas: Categories[]

    constructor(Manager: ManagerInit){
        this.app = this.buildHtmlTemplate(Manager.pageTitle);
        this.areas = [];
        Manager.authArea ? this.displayLogin(Manager) : this.initialise(Manager)
        new ErrorModal();
    }

    @BindThis
    protected initialise(Manager: ManagerInit, token?:string){
        const categories = Manager.categories || [];
        this.areas = categories;
        this.setupAreas();
        new LoadingModal();


        //LOOK FOR IMAGE KEY IN LABEL CARD KEYS IN CONFIG TO SET CARD TYPE
        const cardType = !!Manager.labelCardKeys[0] ? 'label-card' : 'text-card';
        new List(categories, Manager.categoryKeyName, Manager.labelCardKeys, cardType);
        new Form(Manager.keyMapping);

        store.dispatch(thunks.fetchData(Manager.dataUrl));
        store.dispatch(updateDataUrl(Manager.dataUrl));
        if (token) store.dispatch(setAuthentication(token))
        store.dispatch(updateFilterKey(Manager.categoryKeyName || ''));
    }

    private displayLogin(Manager: ManagerInit){
        // const login = DOMHelper.create<HTMLUserLoginElement>('user-login');
        const login = document.createElement('user-login') as any;
        if (Manager.authArea) login.database = DOMHelper.sanitise(Manager.authArea);
        
        
        // login.callbackFn = 
        login.callbackFn = (token:string) => {
            if (token){
                this.initialise(Manager, token);
            }
        };
        DOMHelper.appendChildren(this.app, [login])
    }

    private setupAreas(){
        //CREATE DRAG AND DROP AREAS
        const areas = this.areas.map((col: Categories) => {
            return new DropArea(col[0], col[1], !!col[2]);
        })
        const parent = document.querySelector('.droparea')!;
        if (this.areas.length > 0)
            areas.forEach(area => parent.appendChild(area.element));
        else 
            DOMHelper.renderInnerHTML('.droparea', '<p> You currently have no filters set up </p>');
        
    }

    private buildHtmlTemplate(pageTitle: string): HTMLElement{
        let parent = document.getElementById('app')! as HTMLDivElement;
        if (parent){
            const formTags = ['kclsu-modal'];
            
            DOMHelper.renderInnerHTML('#app', `
                <kclsu-modal show="false"></kclsu-modal>
                <div class="area">
                    <h1>${pageTitle}</h1>
                    <div class="droparea"></div>
                </div>
                <div class="list"></div>
                <div class="editor">
                    <form>
                        <div id="fileinputs"></div>
                        <div id="textinputs">
                            <div id="controls"></div>
                        </div>
                        <!-- <div id="controls"></div> -->
                    </form>
                </div> `,
                formTags)
        }
        else {
            parent = DOMHelper.createDivHTML();
            store.dispatch(setError('No Div with parent ID APP displayed'));
        }
        return parent;
    }


}

export default ContentManager;