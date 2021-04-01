import {KeyMap, validChecks} from '../types/types';
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
                this.setErrorHelper(validator.isURL(val) && validator.contains(val, 'kclsu.org'), errorMsg);
                break;
            case 'isAKclsuEvent':
                this.setErrorHelper(validator.isURL(val) && validator.contains(val, 'kclsu.org/ents/event/'), errorMsg);
                break;
            case 'isDate':
                this.setErrorHelper(validator.matches(val, /^202[1-9][:-][0-1][0-9][:-]([0-2][0-9]|3[0-1])$/), errorMsg); //yyy:mm:dd
                break;
            case 'isTime':
                this.setErrorHelper(validator.matches(val, /^([01][0-9]|2[0-3])[:-][0-6][0-9][:-][0-6][0-9]$/), errorMsg); //hh:mm:ss
                break;
            case 'isBoolean': 
                this.setErrorHelper(validator.isBoolean(val), errorMsg);
                break;
            case 'isNotThumbnail':
                this.setErrorHelper(!validator.contains(val, '/website_uploads/Database_Uploads/thumbnails/'), errorMsg);
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