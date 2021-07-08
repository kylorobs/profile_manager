import { LOCAL_STORAGE_KEY } from './constants';
import { localStorage, fireBaseResponse } from '../types/types'


export const createDateString = (date: Date): string => {
    if (!(date instanceof Date)){
        try {
            date = new Date(date)
        } catch {
            return '';
        }
    }
    return date.toDateString();
}

export function checkForValidToken(): string {
    const storedTokenObject: localStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string);
    if (!storedTokenObject || !storedTokenObject.token) return ''; 
    const validToken =  +storedTokenObject.expiresIn > Date.now();
    if (!validToken){
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return '';
    }
    return storedTokenObject.token;
}

export function locallyStoreToken(tokenObject: fireBaseResponse ): void {
    const expirationDate:any = new Date(new Date().getTime() + +tokenObject.expiresIn * 1000);
    const storedObject: localStorage = { 
        token: tokenObject.idToken, 
        expiresIn: expirationDate
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedObject));
}