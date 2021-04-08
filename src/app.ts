import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import FormSlice from './state/FormSlice';
import ContentManager from './containers/ContentManager';
import 'kclsu-components';
import './styles.scss';


export const store = configureStore({
    reducer: {
        data: ProfileSlice.reducer,
        form: FormSlice.reducer
    } 
})

export type RootState = ReturnType<typeof store.getState>;


(function(global: any){

    var app;

    global.contentManager = function init(config: any){
        app = new ContentManager(config);
    }

    return app;


})(window);





 
