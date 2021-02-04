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
    pageTitle: 'Elections Results Manager ',
    categories: [],
    dataUrl: 'https://varsity-f9a3f.firebaseio.com/163/results',
    labelCardKeys: ['ImageLink', 'Name', ''],
    categoryKeyName: '',
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
            keyName: 'ImageLink',
            inputTitle: 'Image Link',
            inputDefaultText: '',
            type: 'image_file',
            thumbnailUrl: 'https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png',
            validationErrorMsg: 'You have not uploaded a Profile Image!',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'ManifestoLink',
            inputTitle: 'Manifesto Link',
            inputDefaultText: '',
            type: 'input',
            validationErrorMsg: 'You have not added a manifesto link!',
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
            keyName: 'ResultsLink',
            inputTitle: 'Breakdown Spreadsheet',
            inputDefaultText: '',
            type: 'document_file',
            validationErrorMsg: 'There is no Breakdown Spreadsheet attached',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'candidateId',
            inputTitle: 'Candidate Id',
            inputDefaultText: 'The ID of the candidate',
            type: 'input',
            validationErrorMsg: 'There is no candidate ID',
            validationTypes: ['isNotEmpty']
        },
    ]
    
    });
