import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import ProfileManager from './components/ProfileManager/ProfileManager';
import 'kclsu-components';
import './styles.scss';

export const store = configureStore({
    reducer: ProfileSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>;


const gui = new ProfileManager({
    categories: [['Xhibit', 'xhibit'], ['Feautured', 'featured'], ['Artists', 'artists'], ['Performers', 'performers']],
    categoryKeyName: 'type',
    keyMapping: [
        { 
            keyName: 'name',
            inputTitle: 'Name',
            inputDefaultText: 'Full name...',
            type: 'string'
        },
        { 
            keyName: 'image',
            inputTitle: 'Profile Image',
            inputDefaultText: '',
            type: 'file'
        },
        { 
            keyName: 'description',
            inputTitle: 'Description',
            inputDefaultText: 'A short description...',
            type: 'string'
        },
        { 
            keyName: 'facebook',
            inputTitle: 'Facebook',
            inputDefaultText: 'Facebook full url...',
            type: 'string'
        },
        { 
            keyName: 'twitter',
            inputTitle: 'Twitter',
            inputDefaultText: 'Twitter full url...',
            type: 'string'
        },
        { 
            keyName: 'website',
            inputTitle: 'Website',
            inputDefaultText: '',
            type: 'string'
        },
        { 
            keyName: 'upcomingevent',
            inputTitle: 'Website',
            inputDefaultText: 'The kclsu upcoming event url....',
            type: 'string'
        },
    ]

});
console.log(gui);

//NOTES
//IF CATEGORIES.LENGTH > 0, THEN WILL AUTOMATICALLY CREATE A SELECT INPUT FROM THOSE CATEGORIES. 
// OTHERWISE THERE WILL BE NO DROP AREAS, AND NO SELECT DROP DOWN