import { configureStore } from '@reduxjs/toolkit';
import ProfileSlice from './state/ProfileSlice';
import ProfileManager from './components/ProfileManager/ProfileManager';

export const store = configureStore({
    reducer: ProfileSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>;

const gui = new ProfileManager([['dd', 'dds'], ['sdsd', 'sdsds'], ['sdsd', 'sdsds']], 'type');
console.log(gui);