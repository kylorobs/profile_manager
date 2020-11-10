import {Profile} from './Profile';

export interface State {
    editing_id: string,
    profiles: Profile[],
    editing:boolean,
    authenticated: boolean
}