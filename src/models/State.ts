import {Profile} from './Profile';

export interface FormState {
    editing_id: string,
    editing:boolean,
}

export interface DataState {
    dataUrl: string,
    error: boolean,
    errorMessage: string
    profiles: Profile[],
    filterid: string,
    filterkey: string,
    authenticated: boolean
}