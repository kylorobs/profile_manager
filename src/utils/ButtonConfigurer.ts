
//USE SINGLETON PATTERN
// HANDLES ALL KCLSU-BUTTON CLICK EVENTS

class ButtonHandler {

    private emitFunctions: { [key: string]: (e: Event) => void } = {};
    static instance: ButtonHandler;


    private constructor() {
        document.addEventListener('emitClick', (e: any) => this.clickHandler(e));
    }

    static getInstance(): ButtonHandler {
        if (this.instance) return this.instance;
        else {
            this.instance = new ButtonHandler();
            return this.instance;
        };
    }

    public addEmitter(name: string, fn: (e: Event) => void) {
        this.emitFunctions[name] = fn;
    }

    private clickHandler(e: any) {
        const emitName = e.detail;
        //FIND THE MATCHING EMIT NAME IN ORDER TO EXECUTE THE APPROPRIATE FUNCTION
        const emitFunction = this.emitFunctions[emitName]
        if (emitFunction) emitFunction(e);
        else console.log('unregistered click event');
    }

}

export default ButtonHandler;