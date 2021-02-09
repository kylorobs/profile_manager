import { validChecks } from '../models/InputKeys';
import validator from 'validator';

export function validateInput(val: any, type: validChecks ): boolean {
    switch(type){
        case 'isRequired':
            return !validator.isEmpty(val);
        case  'isUrl':
            return validator.isURL(val);
        case 'isEmail':
            return validator.isEmail(val);
        case 'isFacebookUrl':
            return validator.contains(val, 'facebook.com');
        case 'isInstagramUrl':
            return validator.contains(val, 'instagram.com');
        case 'isTwitterUrl':
            return validator.contains(val, 'twitter.com');
        case 'isNumber':
            return validator.isNumeric(val);
        case 'isAKclsuUrl':
            return validator.isURL && validator.contains(val, 'kclsu.org');
        case 'isAKclsuEvent':
            return validator.isURL && validator.contains(val, 'kclsu.org/ents/event/');
        default: return true;
    }
}