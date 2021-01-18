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


const gui = new ProfileManager({
    categories: [['Xhibit', 'xhibit'], ['Feautured', 'featured'], ['Artists', 'artists'], ['Performers', 'performers'], ['Special Acts', 'specialActs']],
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
            keyName: 'image',
            inputTitle: 'Profile Image',
            inputDefaultText: '',
            type: 'file',
            image: true,
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
            keyName: 'upcomingevent',
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
            options: [['Xhibit', 'xhibit'], ['Feautured', 'featured'], ['Artists', 'artists'], ['Performers', 'performers'], ['Special Acts', 'specialActs']],
            validationErrorMsg: 'Please choose a category',
            validationTypes: ['isNotEmpty']
        }
    ]

});
console.log(gui);

//NOTES
//IF CATEGORIES.LENGTH > 0, THEN WILL AUTOMATICALLY CREATE A SELECT INPUT FROM THOSE CATEGORIES. 
// OTHERWISE THERE WILL BE NO DROP AREAS, AND NO SELECT DROP DOWN