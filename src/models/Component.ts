
export abstract class Component<T> {
    abstract el: T
    constructor(){}

    abstract createElement():T
}