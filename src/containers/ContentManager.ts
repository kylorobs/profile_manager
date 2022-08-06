import List from './List';
import Form from './Form';
import { store } from '../app';
import {
    updateDataUrl,
    loading,
    updateFilterKey,
    setAuthentication,
    setError
} from '../state/ProfileSlice';
import * as thunks from '../state/thunks/profile';
import { ManagerInit, serverCustomToken, fireBaseResponse } from '../types/types';
import LoadingModal from '../components/Modals/LoadingModal';
import DOMHelper from '../utils/DOMHelper';
import { BindThis } from '../decorators/bindthis';
import ErrorModal from '../components/Modals/ErrorModal';
import AppHTML from '../components/AppHTML/AppHTML';
import { SERVER_ENDPOINT, DEV_ENDPOINT, devConfig } from '../utils/constants';
import { locallyStoreToken, checkForValidToken } from '../utils/functions';
import Actions from './Actions';


class ContentManager {

    app: HTMLElement;
    authenticated: boolean = false;

    constructor(Config: ManagerInit) {
        //Create the boiler plate html for the application
        this.app = new AppHTML(Config.pageTitle).el;
        //Check if the config supplied requires authentication
        Config.authRequired ? this.authenticate(Config) : this.initialise(Config)
        //register an error modal with redux state listeners
        new ErrorModal();
        //register a loading modal with redux state listeners
        new LoadingModal();
    }

    @BindThis
    protected initialise(Config: ManagerInit, token: string = '') {
        DOMHelper.appendChildren(this.app);

        const filterConfigs = Config.filters || [];
        const cardType = !!Config.labelCardKeys[0] ? 'label-card' : 'text-card'; //LOOK FOR IMAGE KEY IN LABEL CARD KEYS IN CONFIG TO SET CARD TYPE


        new List(filterConfigs, Config.categoryKeyName, Config.labelCardKeys, cardType); // create the list container
        new Form(Config.keyMapping, Config.updateOnly); // create the form container
        new Actions(!!Config.updateOnly);
        // update redux store
        this.updateStore(Config, token)
    }

    private updateStore(Config: ManagerInit, token?: string) {
        const databaseUri = Config.devMode ? `${devConfig.DEV_BACKEND_DOMAIN}${Config.dataUrl}` : Config.dataUrl;
        //fetch data from database
        store.dispatch(thunks.fetchData(databaseUri));
        store.dispatch(loading())
        //Provide the cloud database url
        store.dispatch(updateDataUrl(databaseUri));
        // if there is an authentication token, add it to the redux store
        if (token) store.dispatch(setAuthentication(token))
        store.dispatch(updateFilterKey(Config.categoryKeyName || ''));
    }


    private async authenticate(Config: ManagerInit) {

        const existingToken: string = checkForValidToken();
        if (existingToken) this.initialise(Config, existingToken);
        else {

            const endpoint = Config.devMode ? DEV_ENDPOINT : SERVER_ENDPOINT;
            const secret = Config.devMode ? devConfig.DEVSERVER_TOKEN : Config.secret;
            const apiKey = Config.devMode ? devConfig.APIKEY : Config.apiKey;

            try {
                // COLLECT CUSTOM TOKEN FROM SERVER
                const customToken: serverCustomToken = await (await fetch(`${endpoint}/protectedauth/${secret}`, { method: 'POST' })).json();
                const pkg = { token: customToken.token, returnSecureToken: true }
                const firebaseIdToken: fireBaseResponse = await (await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`, { method: 'POST', body: JSON.stringify(pkg) })).json();

                if (!firebaseIdToken.idToken || !customToken.token) throw new Error('issue with token retrieval and validation. You may not have the right permissions. Please ask for developer assistance');

                locallyStoreToken(firebaseIdToken)
                this.initialise(Config, firebaseIdToken.idToken);

            } catch (e) {
                DOMHelper.appendChildren(this.app)
                store.dispatch(setError(e.toString()));
            }
        }

    }

}

export default ContentManager;