import {Profile} from './Profile';

export interface State {
    editing_id: string,
    profiles: Profile[],
    filterid: string,
    filterkey: string,
    editing:boolean,
    authenticated: boolean
}