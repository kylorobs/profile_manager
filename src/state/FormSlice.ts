import {
  createSlice
} from '@reduxjs/toolkit';
import {
  FormState
} from '../models/State'


const initialState: FormState = {
  editing: false,
  editing_id: '',
}

const FormSlice = createSlice({
  name: 'form',
  initialState: initialState as FormState,
  reducers: {
    edit: (state, action) => {
      state.editing = true;
      state.editing_id = action.payload;
    },
    resetEditMode: (state) => {
      state.editing = false;
      state.editing_id = '';
    }
  }
});

export const {
  edit,
  resetEditMode,
} = FormSlice.actions;


export default FormSlice;