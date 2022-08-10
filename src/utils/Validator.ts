import { isEmail } from 'class-validator';
import { KeyMap, validChecks } from '../types/types';
import isEmpty from 'validator/es/lib/util/isEmpty';


class Validator {

    isValid: boolean;
    errorMessages: string[];
    inputTitle: string;

    constructor(val: any, keyMap: KeyMap) {
        this.isValid = true;
        this.errorMessages = [];
        this.inputTitle = keyMap.keyName;

        //check for required option in keymap
        const containsRequired = keyMap.validationTypes.find(type => type === 'isRequired');
        if (!val) {
            if (containsRequired)
                keyMap.validationTypes.forEach(type => this.validate(val, type, keyMap.validationErrorMsg))
        }
        else keyMap.validationTypes.forEach(type => this.validate(val, type, keyMap.validationErrorMsg))

    }

    validate(val: any, type: validChecks, errorMsg: string) {
        //WE NEED TO FIRST  CHECK IF FIELD IS REQUIRED - THEN ONLY PROCEED WITH OTHER ERRORS
        switch (type) {
            case 'isRequired':
                this.setErrorHelper(!isEmpty(val), errorMsg);
                break;
            case 'isFacebookUrl':
                this.setErrorHelper(contains(val, 'facebook.com'), errorMsg);
                break;
            case 'isInstagramUrl':
                this.setErrorHelper(contains(val, 'instagram.com'), errorMsg);
                break;
            case 'isUrl':
                this.setErrorHelper(isURL(val), errorMsg);
                break;
            case 'isEmail':
                this.setErrorHelper(isEmail(val), errorMsg);
                break;
            case 'isImage':
                this.setErrorHelper(contains(val, '.jpg'), errorMsg);
                break;
            case 'isPdf':
                this.setErrorHelper(contains(val, '.pdf'), errorMsg);
                break;
            case 'isTwitterUrl':
                this.setErrorHelper(contains(val, 'twitter.com'), errorMsg);
                break;
            case 'isNumber':
                this.setErrorHelper(isNumeric(val), errorMsg);
                break;
            case 'isAKclsuUrl':
                this.setErrorHelper(isURL(val) && contains(val, 'kclsu.org'), errorMsg);
                break;
            case 'isAKclsuEvent':
                this.setErrorHelper(isURL(val) && contains(val, 'kclsu.org/ents/event/'), errorMsg);
                break;
            case 'isDateString':
                this.setErrorHelper(matches(val, /^202[1-9][:-][0-1][0-9][:-]([0-2][0-9]|3[0-1])$/), errorMsg); //yyy:mm:dd
                break;
            case 'isTimeString':
                this.setErrorHelper(matches(val, /^([01][0-9]|2[0-3])[:-][0-6][0-9][:-][0-6][0-9]$/), errorMsg); //hh:mm:ss
                break;
            case 'isBoolean':
                this.setErrorHelper(isBoolean(val), errorMsg);
                break;
            case 'isNotThumbnail':
                this.setErrorHelper(!contains(val, '/website_uploads/Database_Uploads/thumbnails/'), errorMsg);
                break;
            default:
        }
    }

    setErrorHelper(valid: boolean, errorMsg: string) {
        if (!valid) {
            this.isValid = false;
            if (!this.errorMessages.find(er => er === errorMsg)) {
                this.errorMessages.push(errorMsg)
            }
        }
    }
}

export default Validator;