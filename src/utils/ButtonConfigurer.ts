
//USE SINGLETON PATTERN
// HANDLES ALL KCLSU-BUTTON CLICK EVENTS

type EmitFunction = [string, (e:Event) => void]

class ButtonHandler {

    private emitFunctions: EmitFunction[];
    static instance: ButtonHandler;

    private constructor(){
        this.emitFunctions = [];
        document.addEventListener('emitClick', (e:any) => this.clickHandler(e));
    }

    static getInstance(): ButtonHandler{
        if (this.instance) return this.instance;
        else {
            this.instance = new ButtonHandler();
            return this.instance;
        }; 
    }

    public addEmitter(name: string, fn: (e:Event) => void){
        this.emitFunctions.push([name, fn]);
    }

    private clickHandler(e:any){
        const emitName = e.detail;
        //FIND THE MATCHING EMIT NAME IN ORDER TO EXECUTE THE APPROPRIATE FUNCTION
        const  emitFunction = this.emitFunctions.find(emitter => emitter[0] === emitName);
        if (emitFunction) emitFunction[1](e);
        else console.log('unregistered click event');
    }

}

export default ButtonHandler;