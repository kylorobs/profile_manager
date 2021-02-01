import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import ProfileManager from './components/ProfileManager/ProfileManager';
import 'kclsu-components';
import './styles.scss';
import FormSlice from './state/FormSlice';


export const store = configureStore({
    reducer: {
        data: ProfileSlice.reducer,
        form: FormSlice.reducer
    } 
})

export type RootState = ReturnType<typeof store.getState>;


(function(global: any){

    var app;

    global.profileManager = function init(config: any){
        app = new ProfileManager(config);
    }

    return app;


})(window);



 new ProfileManager({
pageTitle: 'Elec Candidate Manager ',
categories: [['Approved', 'Approved', null], ['UnApproved', 'UnApproved', null]],
dataUrl: 'https://varsity-f9a3f.firebaseio.com/87634',
labelCardKeys: ['', 'Name', 'Post'],
categoryKeyName: 'Status',
keyMapping: [
    { 
        keyName: 'Name',
        inputTitle: 'Name',
        inputDefaultText: 'Full name...',
        type: 'input',
        validationErrorMsg: 'Please supply a valid name',
        validationTypes: ['isNotEmpty']
    },
    { 
        keyName: 'ManifestoLink',
        inputTitle: 'Manifesto Link',
        inputDefaultText: '',
        type: 'input',
        validationErrorMsg: 'You have not uploaded a manifesto link!',
        validationTypes: ['isNotEmpty']
    },
    { 
        keyName: 'Post',
        inputTitle: 'Post Title',
        inputDefaultText: '',
        type: 'input',
        validationErrorMsg: 'There is no Title!',
        validationTypes: ['isNotEmpty']
    },
    { 
        keyName: 'Status',
        inputTitle: 'Status',
        inputDefaultText: 'The candidates status',
        type: 'input',
        validationErrorMsg: 'Please enter a candidate status.',
        validationTypes: ['isNotEmpty']
    },
]

});
