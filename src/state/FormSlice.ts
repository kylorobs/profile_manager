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
    }
  }
});

export const {
  edit,
  resetEditMode,
  startEditingNew
} = FormSlice.actions;


export default FormSlice;