import {KeyMap, validChecks} from '../../../models/InputKeys';
import validator from 'validator';


class Validator {

    isValid: boolean;
    errorMessages: string[];

    constructor(val: any, keyMap: KeyMap ){
        this.isValid = true;
        this.errorMessages = [];

        //check for required option in keymap
        const containsRequired = keyMap.validationTypes.find(type => type === 'isRequired');
        if (!val){
            if (containsRequired) 
                keyMap.validationTypes.forEach(type => this.validate(val, type, keyMap.validationErrorMsg))
        }
        else keyMap.validationTypes.forEach(type => this.validate(val, type, keyMap.validationErrorMsg)) 
        
    }

    validate(val: any, type: validChecks, errorMsg: string){
        //WE NEED TO FIRST  CHECK IF FIELD IS REQUIRED - THEN ONLY PROCEED WITH OTHER ERRORS
        switch(type){
            case 'isRequired':
                this.setErrorHelper(!validator.isEmpty(val), errorMsg);
                break;
            case 'isFacebookUrl':
                this.setErrorHelper(validator.contains(val, 'facebook.com'), errorMsg);
                break;
            case 'isInstagramUrl':
                this.setErrorHelper(validator.contains(val, 'instagram.com'), errorMsg);
                break;
            case 'isUrl':
                this.setErrorHelper(validator.isURL(val), errorMsg);
                break;
            case 'isEmail':
                this.setErrorHelper(validator.isEmail(val), errorMsg);
                break;
            case 'isImage':
                this.setErrorHelper(validator.contains(val, '.jpg'), errorMsg);
                break;
            case 'isPdf':
                this.setErrorHelper(validator.contains(val, '.pdf'), errorMsg);
                break;
            case 'isTwitterUrl':
                this.setErrorHelper(validator.contains(val, 'twitter.com'), errorMsg);
                break;
            case 'isNumber':
                this.setErrorHelper(validator.isNumeric(val), errorMsg);
                break;
            case 'isAKclsuUrl':
                this.setErrorHelper(validator.isURL && validator.contains(val, 'kclsu.org'), errorMsg);
                break;
            case 'isAKclsuEvent':
                this.setErrorHelper(validator.isURL && validator.contains(val, 'kclsu.org/ents/event/'), errorMsg);
                break;
            default: 
        }
    }

    setErrorHelper(valid: boolean, errorMsg: string){
        if (!valid) {
            this.isValid = false;
            if (!this.errorMessages.find(er => er === errorMsg)) {
                this.errorMessages.push(errorMsg)
            } 
        }
    }
}

export default Validator;