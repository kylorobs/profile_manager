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
  loading: false,
  errorMessage: '',
  profiles: [],
  filterkey: '',
  filterid: '',
  filterWithCustomFunction: '',
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
    loading: (state: DataState) => {
      state.loading = true;
    },
    notLoading: (state: DataState) => {
      state.loading = false;
    },
    updateCategory: <T extends {payload: {id: string, value: string}}> (state: DataState, action: T) => {
      const profileIndex = state.profiles.findIndex((prof:Profile) => prof.id === action.payload.id);
      if (profileIndex > -1){
        state.profiles[profileIndex][state.filterkey] = action.payload.value;
      }
    },
    changeFilter: (state: DataState, action) => {
      state.filterWithCustomFunction = '';
      state.filterid = action.payload;
    },
    updateFilterKey: (state: DataState, action) => {
      state.filterkey = action.payload;
    },
    updateFilterWithCustomFunction: (state: DataState, action) => {
      state.filterid = '';
      state.filterWithCustomFunction = action.payload;
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
      state.loading = false;
    },
    [thunks.addData.fulfilled]: (state, action) => {
      state.profiles.unshift(action.payload);
      state.loading = false;
    },
    [thunks.deleteData.fulfilled]: (state, action) => {
      const removeIndex = state.profiles.findIndex(prof => prof.id === action.payload.id);
      if (removeIndex >= 0) state.profiles.splice(removeIndex, 1);
      state.loading = false;
    },
    [thunks.updateCategory.fulfilled]: (state, action) => {
      const profileIndex = state.profiles.findIndex((prof:Profile) => prof.id === action.payload.id);
      console.log(profileIndex)
      if (profileIndex > -1){
        state.profiles[profileIndex][state.filterkey] = action.payload.value;
      }
      state.loading = false;
    },
    [thunks.updateData.fulfilled]: (state, action) => {
      if (action.payload.id){
        const profileIndex = state.profiles.findIndex((prof:Profile) => prof.id === action.payload.id);
        if (profileIndex > -1){
          state.profiles[profileIndex] = {...action.payload.data, id: action.payload.id};
        }
        else console.log(action.payload.ID)
      }
      state.loading = false;
    }
    
  }
});

export const {
  addProfile,
  loading,
  notLoading,
  updateCategory,
  changeFilter,
  updateFilterKey,
  updateFilterWithCustomFunction,
  updateDataUrl,
  setError,
} = profileSlice.actions;


export default profileSlice;