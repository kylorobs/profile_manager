import {Profile} from './Profile';

export interface FormState {
    editing_id: string,
    editing:boolean,
}

export interface DataState {
    profiles: Profile[],
    filterid: string,
    filterkey: string,
    authenticated: boolean
}