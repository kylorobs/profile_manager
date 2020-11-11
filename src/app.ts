import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import ProfileManager from './components/ProfileManager/ProfileManager';
import 'kclsu-components';
import './styles.scss';

export const store = configureStore({
    reducer: ProfileSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>;

const gui = new ProfileManager([['Xhibit', 'xhibit'], ['Feautured', 'featured'], ['Artists', 'artists'], ['Performers', 'performers']], 'type');
console.log(gui);