import {
  createSlice
} from '@reduxjs/toolkit';
import {Profile} from '../models/Profile';
import {
  DataState
} from '../models/State';
import * as thunks from './thunks/profile';

const initialState: DataState = {
  dataUrl:'',
  error: false,
  errorMessage: '',
  profiles: [],
  filterkey: '',
  filterid: '',
  authenticated: false
}


const profileSlice = createSlice({
  name: 'profiles',
  initialState: initialState,
  reducers: {
    addProfile: (state: DataState, action) => {
      //FIRST UPLOAD TO FIREBASE
      //THEN
      state.profiles.unshift(action.payload);
    },
    deleteProfile: (state: DataState) => {
      return state;
    },
    updateCategory: <T extends {payload: {id: string, value: string}}> (state: DataState, action: T) => {
      const profileIndex = state.profiles.findIndex((prof:Profile) => prof.id === action.payload.id);
      if (profileIndex > -1){
        state.profiles[profileIndex][state.filterkey] = action.payload.value;
      }
    },
    changeFilter: (state: DataState, action) => {
      state.filterid = action.payload;
    },
    updateFilterKey: (state: DataState, action) => {
      state.filterkey = action.payload;
    },
    updateDataUrl: (state: DataState, action) => {
      state.dataUrl = action.payload;
    },
    setError: (state: DataState, action) => {
      state.error = true;
      state.errorMessage = action.payload;
    },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [thunks.fetchData.fulfilled]: (state, action) => {
      state.profiles = action.payload;
    },
    [thunks.addData.fulfilled]: (state, action) => {
      state.profiles.unshift(action.payload);
    },
    [thunks.deleteData.fulfilled]: (state, action) => {
      console.log(action.payload)
      const removeIndex = state.profiles.findIndex(prof => prof.id === action.payload.id);
      console.log('DELETED INDEX');
      console.log(removeIndex);
      if (removeIndex >= 0) state.profiles.splice(removeIndex, 1);
    },
    [thunks.updateData.fulfilled]: (state, action) => {
      if (action.payload.id){
        const profileIndex = state.profiles.findIndex((prof:Profile) => prof.id === action.payload.id);
        if (profileIndex > -1){
          state.profiles[profileIndex] = {...action.payload.data, id: action.payload.id};
        }
        else console.log(action.payload.ID)
      }
    }
  }
});

export const {
  addProfile,
  deleteProfile,
  updateCategory,
  changeFilter,
  updateFilterKey,
  updateDataUrl,
  setError,
} = profileSlice.actions;


export default profileSlice;