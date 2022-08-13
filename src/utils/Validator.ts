import { KeyMap, validChecks } from '../types/types';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import isBoolean from 'validator/es/lib/isBoolean';

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

    validate(val: string, type: validChecks, errorMsg: string) {
        //WE NEED TO FIRST  CHECK IF FIELD IS REQUIRED - THEN ONLY PROCEED WITH OTHER ERRORS
        switch (type) {
            case 'isRequired':
                this.setErrorHelper(val !== '', errorMsg);
                break;
            case 'isFacebookUrl':
                this.setErrorHelper(val.includes('facebook.com'), errorMsg);
                break;
            case 'isInstagramUrl':
                this.setErrorHelper(val.includes('instagram.com'), errorMsg);
                break;
            case 'isUrl':
                this.setErrorHelper(isURL(val), errorMsg);
                break;
            case 'isEmail':
                this.setErrorHelper(isEmail(val), errorMsg);
                break;
            case 'isImage':
                this.setErrorHelper(val.includes('.jpg'), errorMsg);
                break;
            case 'isPdf':
                this.setErrorHelper(val.includes('.pdf'), errorMsg);
                break;
            case 'isTwitterUrl':
                this.setErrorHelper(val.includes('twitter.com'), errorMsg);
                break;
            case 'isAKclsuUrl':
                this.setErrorHelper(isURL(val) && (val.includes('kclsu.org') || val.includes('cloudinary.com/kclsu-media')), errorMsg);
                break;
            case 'isACloudinaryUrl':
                this.setErrorHelper(isURL(val) && val.includes('cloudinary.com/kclsu-media'), errorMsg);
                break;
            case 'isAKclsuEvent':
                this.setErrorHelper(isURL(val) && val.includes('kclsu.org/ents/event/'), errorMsg);
                break;
            case 'isBoolean':
                this.setErrorHelper(isBoolean(val), errorMsg);
                break;
            case 'isNotThumbnail':
                this.setErrorHelper(!val.includes('/website_uploads/Database_Uploads/thumbnails/'), errorMsg);
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