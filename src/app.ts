import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import ProfileManager from './components/ProfileManager/ProfileManager';
import 'kclsu-components';
import './styles.scss';
import FormSlice from './state/FormSlice';
import { Profile } from './models/Profile';

export const store = configureStore({
    reducer: {
        data: ProfileSlice.reducer,
        form: FormSlice.reducer
    } 
})

export type RootState = ReturnType<typeof store.getState>;


const filterForNowWebsite = (val: Profile) => {
    return !val.website;
}

const gui = new ProfileManager({
    pageTitle: 'ProjectX Profile Manager ',
    categories: [['No Website', 'website_filter', filterForNowWebsite]],
    dataUrl: 'https://test-db-1577e.firebaseio.com/artists',
    categoryKeyName: 'twitter',
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
            keyName: 'image',
            inputTitle: 'Profile Image',
            inputDefaultText: '',
            type: 'image_file',
            thumbnailUrl: 'https://res.cloudinary.com/kclsu-media/image/upload/v1605106869/website_uploads/MISC/EM_u4q3mg.png',
            validationErrorMsg: 'You have not uploaded a profile image!',
            validationTypes: ['isNotEmpty']
        },
        { 
            keyName: 'manifesto',
            inputTitle: 'Manifesto',
            inputDefaultText: '',
            type: 'document_file',
            validationErrorMsg: 'You have not uploaded a document!',
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
            options: [['Xhibit', 'xhibitArtists', null], ['Feautured', 'upcoming', null], ['Artists', 'artists', null], ['Performers', 'performers', null], ['Special Acts', 'specialActs', null]],
            validationErrorMsg: 'Please choose a category',
            validationTypes: ['isNotEmpty']
        }
    ]

});
console.log(gui);
