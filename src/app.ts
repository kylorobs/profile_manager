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
    pageTitle: 'ProjectX Profile Manager ',
    categories: [["Coming Up", "upcoming", null], ["Artists", "xhibitArtists", null], ["Creators", "specialActs", null], ["Performers", "performers", null]],
    labelCardKeys: ['url', 'name', ''],
    dataUrl: 'https://test-db-1577e.firebaseio.com/artists',
    categoryKeyName: 'type',
    keyMapping: [
        { 
            keyName: 'name',
            inputTitle: 'Name',
            inputDefaultText: 'Full name...',
            type: 'input',
            validationErrorMsg: 'Please supply a valid name',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'url',
            inputTitle: 'Profile Image',
            inputDefaultText: '',
            type: 'image_file',
            thumbnailUrl: 'https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png',
            validationErrorMsg: 'You have not uploaded a profile image!',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'description',
            inputTitle: 'Description',
            inputDefaultText: 'A short description...',
            type: 'textarea',
            validationErrorMsg: 'Please enter a short text description.',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'facebook',
            inputTitle: 'Facebook',
            inputDefaultText: 'Facebook full url...',
            type: 'input',
            validationErrorMsg: 'Please provide a full facebook URL.',
            validationTypes: ['isNotEmpty', 'isFacebookUrl']
        },
        { 
            keyName: 'twitter',
            inputTitle: 'Twitter',
            inputDefaultText: 'Twitter full url...',
            type: 'input',
            validationErrorMsg: 'Please provide a full twitter URL for the twitter profile.',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'website',
            inputTitle: 'Website',
            inputDefaultText: '',
            type: 'input',
            validationErrorMsg: 'Please supply a full website URL.',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'upcomingEvent',
            inputTitle: 'Upcoming Event',
            inputDefaultText: 'The kclsu upcoming event url....',
            type: 'input',
            validationErrorMsg: 'Please provide an event URL from the kclsu events page.',
            validationTypes: ['isUrl']
        },
        { 
            keyName: 'type',
            inputTitle: 'Category',
            inputDefaultText: '...',
            type: 'select',
            options: [["Coming Up", "upcoming", null], ["Artists (Xhibit)", "xhibitArtists", null], ["Creators (Xtend)", "specialActs", null], ["Performers (Xpress)", "performers", null]],
            validationErrorMsg: 'Please choose a category',
            validationTypes: ['isNotEmpty']
        }
    ]
    
    });
