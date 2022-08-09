import {
  createSlice
} from '@reduxjs/toolkit';
import {
  FormState
} from '../types/types';


const initialState: FormState = {
  editing_existing: false,
  editing_new: false,
  editing_id: '',
  keymap: [],
}

const FormSlice = createSlice({
  name: 'form',
  initialState: initialState as FormState,
  reducers: {
    edit: (state, action) => {
      state.editing_existing = true;
      state.editing_new = false;
      state.editing_id = action.payload;
    },
    resetEditMode: (state) => {
      state.editing_existing = false;
      state.editing_new = false;
      state.editing_id = '';
    },
    startEditingNew: (state) => {
      state.editing_existing = false;
      state.editing_new = true;
      state.editing_id = '';
    },
    setKeyMap: (state, action) => {
      state.keymap = action.payload
    }
  }
});

export const {
  edit,
  resetEditMode,
  startEditingNew,
  setKeyMap
} = FormSlice.actions;


export default FormSlice;