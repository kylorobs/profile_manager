import { createSlice } from '@reduxjs/toolkit';
import {RootState} from '../app';
import {State} from '../models/State'

const initialState:State = {
  profiles: [],
  editing: false,
  editing_id: '',
  authenticated: false
}

const profileSlice = createSlice({
    name: 'profiles',
    initialState: initialState,
    reducers: {
      addProfile: (state: RootState) => {
        return state;
      },
      deleteProfile: (state: RootState) => {
        return state;
      },
      edit:  (state: RootState) => {
        state.editing = true;
      }
    }
  }) as any;

  export const { addProfile, deleteProfile, edit } = profileSlice.actions;


  export default profileSlice;