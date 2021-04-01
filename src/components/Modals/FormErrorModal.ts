

// import {BindThis} from '../../../decorators/bindthis';
// import ButtonHandler from '../../../models/ButtonHandler';
// import { KeyMap } from '../../../models/InputKeys';
import Modal from '../../models/Modal';
import Validator from '../../utils/Validator';
import DOMHelper from '../../utils/DOMHelper';



class ErrorModal extends Modal {
    
    private divcontainer: HTMLDivElement;
    private errorList: Validator[]

    constructor(){
      super();
      this.errorList = [];
      this.divcontainer = DOMHelper.createDivHTML();
    }

    private setErrorMessages(): void{
      const ul = document.createElement('ul') as any;
      const combinedMessages = this.errorList
                                .map(er => er.errorMessages)
                                .reduce((acc, cur) => acc.concat(cur));
      combinedMessages.forEach(errorString =>{
          const li = document.createElement('li');
          li.innerText = errorString;
          ul.appendChild(li);
      })

      this.divcontainer.appendChild(ul);
    }

    public handleErrors(errors: Validator[]):void{
        this.errorList = errors;
        this.divcontainer.innerHTML = DOMHelper.sanitise('');
        this.setErrorMessages();
        this.showModal(this.divcontainer);
    }


}

export default ErrorModal;


 