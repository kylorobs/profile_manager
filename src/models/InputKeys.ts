import {Categories} from '../types/types';

export interface ManagerInit {
    categories: Categories[],
    categoryKeyName: string,
    keyMapping: KeyMap[]
}

export type validChecks = 'isNotEmpty' |  'isUrl' | 'isEmail' | 'isImage' | 'isPdf' | 'isFacebookUrl' | 'isInstagramUrl' | 'isTwitterUrl' | 'isNumber' | 'isAKclsuUrl' | 'isAKclsuEvent'

export interface KeyMap {
    keyName: string,
    inputTitle: string,
    inputDefaultText: string,
    type: 'input' | 'select' | 'textarea' | 'file',
    validationTypes: validChecks[],
    validationErrorMsg: string,
    options?: Categories[],
    image? : boolean // if the type is 'file', specify the type of file is an image
}