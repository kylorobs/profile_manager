
import {Profile} from './Profile';

export interface FormState {
    editing_id: string,
    editing_existing: boolean,
    editing_new: boolean
}

export interface DataState {
    dataUrl: string,
    error: boolean,
    loading: boolean,
    errorMessage: string
    profiles: Profile[],
    filterid: string,
    filterkey: string,
    filterWithCustomFunction: string,
    authenticated: boolean,
    token: string
}