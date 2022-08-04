
export interface ManagerInit {
    pageTitle: string,
    authRequired?: boolean,
    devMode?: boolean,
    secret?: string,
    apiKey?: string,
    updateOnly?: boolean,
    filters: Filter[],
    labelCardKeys: [string, string, string], //[Image, Heading, SubText]
    dataUrl: string,
    categoryKeyName: string,
    keyMapping: KeyMap[]
}

export type FormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type validChecks = 'isRequired' | 'isUrl' | 'isEmail' | 'isImage' | 'isPdf' | 'isFacebookUrl' | 'isInstagramUrl' | 'isTwitterUrl' | 'isNumber' | 'isAKclsuUrl' | 'isAKclsuEvent' | 'isDateString' | 'isTimeString' | 'isBoolean' | 'isNotThumbnail'

export interface KeyMap {
    keyName: string,
    inputTitle: string,
    inputDefaultText: string,
    type: 'input' | 'datetime' | 'select' | 'textarea' | 'document_file' | 'image_file',
    thumbnailUrl?: string,
    validationTypes: validChecks[],
    validationErrorMsg: string,
    options?: Filter[]
    updateOnly?: boolean;
}

export type filterFn = ((val: Profile, Index?: number) => boolean) | null;

export type Filter = [string, string, filterFn];


export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(evt: DragEvent): void;
    dropHandler(evt: DragEvent, cb: (id: string) => void): void;
    dragLeaveHandler(evt: DragEvent): void;
}

export interface FormFunctions {
    update: () => void,
    switch?: () => void,
    delete?: () => void,
    add?: () => void
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

export type serverCustomToken = {
    token: string;
}

export type fireBaseResponse = {
    kind: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    isNewUser: boolean;
    error?: {
        message: string;
    }
}


export type localStorage = {
    token: string,
    expiresIn: string
}