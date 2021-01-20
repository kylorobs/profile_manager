

// import {BindThis} from '../../../decorators/bindthis';
// import ButtonHandler from '../../../models/ButtonHandler';
// import { KeyMap } from '../../../models/InputKeys';
import Modal from '../Modal';
import Validator from '../../Form/Validator/Validator';



class ErrorModal {
    
    private divcontainer: HTMLDivElement;
    private modal: Modal;
    private errorList: Validator[]

    constructor(){
      this.errorList = [];
      this.modal = Modal.getInstance();
      const div = document.createElement('div');
      div.id = 'ErrorModal';
      this.divcontainer = div;
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
        this.divcontainer.innerHTML = '';
        this.setErrorMessages();
        this.modal.showModal(this.divcontainer);
    }


}

export default ErrorModal;


 