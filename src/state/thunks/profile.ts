import {
    createAsyncThunk
  } from '@reduxjs/toolkit';
import { store } from '../../app';
import { resetEditMode } from '../FormSlice';
  import {notLoading, setError} from '../ProfileSlice';


const createUrl = (dataPackage: any) => {
  let fetchUrl;
  const {url, id, category} = dataPackage;
  const token = store.getState().data.token;
  const auth = !token ? '' : `?auth=${token}`;

  if (id && category)
    fetchUrl = `${url}/${id}/${category}.json${auth}`;
  else if (id) 
    fetchUrl = `${url}/${id}.json${auth}`;
  else 
    fetchUrl = `${url}.json${auth}`;

  return fetchUrl;
}


const makeRequest = async (type: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH', url: string, data:any) => {
    let payload: any = {
        method: type, 
        headers: {'Content-Type': 'application/json'},
    };
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    if (data) payload.body = JSON.stringify(data);

    const response = await fetch(url, {...payload, signal: controller.signal});
    clearTimeout(timer);
    if (type !== 'DELETE'){
        const result =  await response.json();
        if (!result) throw new Error();
        return result 
    }
    else return response;                
}


export const fetchData: any = createAsyncThunk(
    'profiles/fetchData', async (url:string) => {
        try {
            const res = await makeRequest('GET', createUrl({url}), null);
            const data = [];
            console.log(res)
            for (const key in res){
              if (res[key] !== null) {
                res[key].id = key;
                data.push(res[key])
              }
            }
            return data;
        } catch (e){
            store.dispatch(setError('Error in fetching data:... ' + e));
            store.dispatch(notLoading());
            return ; 
        }
    } 
)


  
  export const updateData: any = createAsyncThunk(
    'profiles/updateData',
    async (dataPackage:any) => {
      try {
        //check there is an id before making request
        if (dataPackage.id){
          const res = await makeRequest('PUT', createUrl(dataPackage), dataPackage.data);
          store.dispatch(resetEditMode());
          return {id:dataPackage.id, data: res};
        }
        else throw new Error('No Id for update to proceed');
      }
      catch(e) {
        store.dispatch(setError('Error in updating data:... ' + e));
        store.dispatch(notLoading());
        return ; 
      }
    }
  )
  
  
  export const addData: any = createAsyncThunk(
    'profiles/addData',
    async (dataPackage:any) => {
        try {
            const res = await makeRequest('POST', createUrl(dataPackage), dataPackage.data);
            const newData = {...dataPackage.data};
            newData.id = res.name;
            store.dispatch(resetEditMode());
          return newData;
        }
        catch(e) {
          store.dispatch(setError('error adding new data field:.... ' + e));
          store.dispatch(notLoading());
          return ; 
        }
      }
  )

    
  export const deleteData: any = createAsyncThunk(
    'profiles/deleteData',
    async (dataPackage:any) => {
      try {
        if (!dataPackage.id) throw new Error('No Id to make delete request');
        await makeRequest('DELETE', createUrl(dataPackage), null);
        store.dispatch(resetEditMode());
        return {id: dataPackage.id};
      }
      catch(e) {
        store.dispatch(setError('Error in deleting data: ... ' + e));
        store.dispatch(notLoading());
        return ; 
      }
    }
  )


  export const updateCategory: any = createAsyncThunk(
    'profiles/updateCategory', async (dataPackage:any) => {
        try {
          if (!dataPackage.id || !dataPackage.category) throw new Error('No Id or Category to make update request');
          const res = await makeRequest('PUT', createUrl(dataPackage), dataPackage.val);
          return { id:dataPackage.id, value: dataPackage.val, data: res};
        }
        catch(e) {
          store.dispatch(setError('error in updating category: ' + e));
          store.dispatch(notLoading());
          return ; 
        }
      } 

)



