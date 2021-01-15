import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {Profile} from '../models/Profile';
import {
  DataState
} from '../models/State'

const initialState: DataState = {
  profiles: [],
  filterkey: '',
  filterid: '',
  authenticated: false
}


export const fetchData: any = createAsyncThunk(
  'profiles/fetchData',
  async (url: string) => {
    const response = await fetch(url);
    const collection = await response.json();
    const data = [];
    for (const key in collection){
      collection[key].id = key;
      data.push(collection[key])
    }
    console.log(data)
    return data;
  }
)

export const updateData: any = createAsyncThunk(
  'profiles/updateData',
  async (dataPackage:any) => {
    try {
      let payload: any = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataPackage.data) // body data type must match "Content-Type" header
      };
      const res = await fetch(`${dataPackage.url}/${dataPackage.id}.json`, payload);
      const result =  await res.json()
      return {id:dataPackage.id, data: result};
    }
    catch {
      return {id: null, data: null};
    }
  }
)

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
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchData.fulfilled]: (state, action) => {
      state.profiles = action.payload;
    },
    [updateData.fulfilled]: (state, action) => {
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
} = profileSlice.actions;


export default profileSlice;