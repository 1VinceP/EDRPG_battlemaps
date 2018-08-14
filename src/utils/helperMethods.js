import _ from 'lodash';
import { toast } from 'react-toastify';

// Finds falsy values in array
export function findFalse( arr ) {
    console.log( arr )
    for( let i = 0; i < arr.length; i++ ) {
        if( !arr[i] ) return false;
    }

    return true;
}

// Converts from camelCase to A String Like This
export function normalizeString(str) {
    return _.camelCase(str).replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
};

// Resets a specific select value
export function resetSelect(name) {
    document.getElementsByName( name )[0].value = ''
}

// Calculates the total numerical value of an object's keys
export function reduceToTotal( obj ) {
    return _.reduce( obj, ( result, value ) => {
        if( value >= 10 )
            value = Math.floor( value / 10 )
        return result += value
    }, 0 )
}

// Throws a toast error
export function toasty( message ) {
    toast.error( message )
}