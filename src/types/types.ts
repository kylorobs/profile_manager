
export interface ManagerInit {
    pageTitle: string,
    authArea?: string,
    filters: Filter[],
    labelCardKeys: [string, string, string], //[Image, Heading, SubText]
    dataUrl: string,
    categoryKeyName: string,
    keyMapping: KeyMap[]
}

export type validChecks = 'isRequired' |  'isUrl' | 'isEmail' | 'isImage' | 'isPdf' | 'isFacebookUrl' | 'isInstagramUrl' | 'isTwitterUrl' | 'isNumber' | 'isAKclsuUrl' | 'isAKclsuEvent' | 'isDate' | 'isTime' | 'isBoolean' | 'isNotThumbnail'

export interface KeyMap {
    keyName: string,
    inputTitle: string,
    inputDefaultText: string,
    type: 'input' | 'select' | 'textarea' | 'document_file' | 'image_file',
    thumbnailUrl?: string,
    validationTypes: validChecks[],
    validationErrorMsg: string,
    options?: Filter[]
}

export type filterFn = ((val:Profile, Index?:number) => boolean) | null;

export type Filter = [string, string, filterFn];


export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(evt: DragEvent): void;
    dropHandler(evt: DragEvent): void;
    dragLeaveHandler(evt: DragEvent): void;
}

export interface FormFunctions {
    switch: () => void,
    update: () => void,
    delete: () => void,
    add: () => void
}

export interface Profile {
    [key: string]: any;
}

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