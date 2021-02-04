import List from '../List/List';
import DropArea from '../DropArea/DropArea'
import Form2 from '../Form/Form2';
import { Categories } from '../../types/types';
import {store} from '../../app';
import {updateDataUrl, updateFilterKey} from '../../state/ProfileSlice';
import * as thunks from '../../state/thunks/profile';
import { ManagerInit} from '../../models/InputKeys';
import LoadingModal from '../Modal/LoadingModal/LoadingModal';
import DOMHelper from '../DOMHelper/DOMHelper';

class ProfileManager {

    public areas: Categories[];

    constructor(Manager: ManagerInit){
        this.buildHtmlTemplate(Manager.pageTitle);
        const categories = Manager.categories || [];
        store.dispatch(thunks.fetchData(`${Manager.dataUrl}.json`));
        store.dispatch(updateDataUrl(Manager.dataUrl));
        this.areas = categories;
        this.setupAreas();
        store.dispatch(updateFilterKey(Manager.categoryKeyName || ''));
        new LoadingModal();
        new List(categories, Manager.categoryKeyName, Manager.labelCardKeys);
        new Form2(Manager.keyMapping);
    }

    setupAreas(){
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

    private buildHtmlTemplate(pageTitle: string): void{
        const parent = document.getElementById('app')! as HTMLDivElement;
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
    }


}

export default ProfileManager;