import {
    createAsyncThunk
  } from '@reduxjs/toolkit';
import { store } from '../../app';
  import {setError} from '../ProfileSlice';


const makeRequest = async (type: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, data:any) => {
    let payload: any = {
        method: type, 
        headers: {'Content-Type': 'application/json'},
    };
    if (data) payload.body = JSON.stringify(data);
    const response = await fetch(url, payload);
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
            const res = await makeRequest('GET', url, null);
            const data = [];
            for (const key in res){
                res[key].id = key;
                data.push(res[key])
            }
            return data;
        } catch (e){
            store.dispatch(setError('error in fetching data: ' + e));
            return ; 
        }
    } 
)


  
  export const updateData: any = createAsyncThunk(
    'profiles/updateData',
    async (dataPackage:any) => {
      try {
        const res = await makeRequest('PUT', `${dataPackage.url}/${dataPackage.id}.json`, dataPackage.data);

        return {id:dataPackage.id, data: res};
      }
      catch(e) {
        store.dispatch(setError('error in updating data: ' + e));
        return ; 
      }
    }
  )
  
  
  export const addData: any = createAsyncThunk(
    'profiles/addData',
    async (dataPackage:any) => {
        try {
            console.log('DATA PACKAGE');
            console.log(dataPackage);
          const res = await makeRequest('POST', `${dataPackage.url}.json`, dataPackage.data);
            const newData = {...dataPackage.data};
            newData.id = res.name;
          return newData;
        }
        catch(e) {
          store.dispatch(setError('error adding new data field: ' + e));
          return ; 
        }
      }
  )

    
  export const deleteData: any = createAsyncThunk(
    'profiles/deleteData',
    async (dataPackage:any) => {
        console.log('delete this id')
        console.log(dataPackage.id)
      try {
          console.log(`${dataPackage.url}/${dataPackage.id}.json`)
        const res = await makeRequest('DELETE', `${dataPackage.url}/${dataPackage.id}.json`, null);
        console.log('STATUS')
        console.log(res.status);
        return {id: dataPackage.id};
      }
      catch(e) {
        store.dispatch(setError('error in deleting data: ' + e));
        return ; 
      }
    }
  )