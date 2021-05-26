import List from './List';
import Form from './Form';
import { store } from '../app';
import {  
    updateDataUrl, 
    updateFilterKey,
    setAuthentication
} from '../state/ProfileSlice';
import * as thunks from '../state/thunks/profile';
import { ManagerInit} from '../types/types';
import LoadingModal from '../components/Modals/LoadingModal';
import DOMHelper from '../utils/DOMHelper';
import { BindThis } from '../decorators/bindthis';
import ErrorModal from '../components/Modals/ErrorModal';
import Filters from './Filters';
import AppHTML from '../components/AppHTML/AppHTML';

class ContentManager {

    app: HTMLElement;
    authenticated: boolean = false;

    constructor(Config: ManagerInit){
        //Create the boiler plate html for the application
        this.app = new AppHTML(Config.pageTitle).el;
        //Check if the config supplied contains authentication
        Config.authArea ? this.displayLogin(Config) : this.initialise(Config)
        //register an error modal with redux state listeners
        new ErrorModal();
        //register a loading modal with redux state listeners
        new LoadingModal(); 
    }

    @BindThis
    protected initialise(Config: ManagerInit, token:string = ''){
        const filterConfigs = Config.filters || [];
        const cardType = !!Config.labelCardKeys[0] ? 'label-card' : 'text-card'; //LOOK FOR IMAGE KEY IN LABEL CARD KEYS IN CONFIG TO SET CARD TYPE
        
        //Create the container areas inside the app
        new Filters(filterConfigs) // create filters container container
        new List(filterConfigs, Config.categoryKeyName, Config.labelCardKeys, cardType); // create the list container
        new Form(Config.keyMapping); // create the form container

        // update redux store
        this.updateStore(Config, token)
    }

    private updateStore(Config: ManagerInit, token?:string){
        //fetch data from database
        store.dispatch(thunks.fetchData(Config.dataUrl));
        //Provide the cloud database url
        store.dispatch(updateDataUrl(Config.dataUrl));
        // if there is an authentication token, add it to the redux store
        if (token) store.dispatch(setAuthentication(token))
        store.dispatch(updateFilterKey(Config.categoryKeyName || ''));
    }
    

    private displayLogin(Config: ManagerInit){

        const login = document.createElement('user-login') as any;
        if (Config.authArea) login.database = DOMHelper.sanitise(Config.authArea);
        
        login.callbackFn = (token:string) => {
            if (token){
                this.initialise(Config, token);
            }
        };
        DOMHelper.appendChildren(this.app, [login])
    }

}

export default ContentManager;