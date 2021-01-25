import { Profile } from "../models/Profile";

export type filterFn = ((val:Profile, Index?:number) => boolean) | null;

export type Categories = [string, string, filterFn];


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