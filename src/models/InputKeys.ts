import {Categories} from '../types/types';

export interface ManagerInit {
    pageTitle: string,
    authArea?: string,
    categories: Categories[],
    labelCardKeys: [string, string, string], //[Image, Heading, SubText]
    dataUrl: string,
    categoryKeyName: string,
    keyMapping: KeyMap[]
}

export type validChecks = 'isRequired' |  'isUrl' | 'isEmail' | 'isImage' | 'isPdf' | 'isFacebookUrl' | 'isInstagramUrl' | 'isTwitterUrl' | 'isNumber' | 'isAKclsuUrl' | 'isAKclsuEvent'

export interface KeyMap {
    keyName: string,
    inputTitle: string,
    inputDefaultText: string,
    type: 'input' | 'select' | 'textarea' | 'document_file' | 'image_file',
    thumbnailUrl?: string,
    validationTypes: validChecks[],
    validationErrorMsg: string,
    options?: Categories[]
}