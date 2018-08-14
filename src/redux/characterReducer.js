import axios from 'axios';

let initialState = {
    character: {
        rank_points: 0,
        gender: '',
        age: '',
        height: '',
        weight: '',
        current_endurance: '',
        current_karma: '',
        karmic_abilities: [],
        checked: [],
        personal: {},
        vehicle: {},
        intelligence: {},
        social: {},
        espionage: {},
        ranged_weapons: [],
        melee_weapons: [],
        grenades: [],
        equipment: [],
        credits: 0,
        m_cr: 0,
        units: 0
    },
    characterIsSaved: true
}

const IMPORT_CHARACTER = 'IMPORT_CHARACTER'
    , UPDATE_INFO = 'UPDATE_INFO'
    , ASSIGN_CHECK = 'ASSIGN_CHECK'
    , FIRE_WEAPON = 'FIRE_WEAPON'
    , RELOAD_WEAPON = 'RELOAD_WEAPON'
    , SAVE_CHARACTER = 'SAVE_CHARACTER'

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case IMPORT_CHARACTER:
            return { ...state, character: action.payload };

        case UPDATE_INFO:
            const { name, value } = action.payload
            return { ...state, character: { ...state.character, [name]: value }, characterIsSaved: false };
        case ASSIGN_CHECK:
            return { ...state, character: { ...state.character, checked: action.payload }, characterIsSaved: false };
        case FIRE_WEAPON:
            return { ...state, character: { ...state.character, ranged_weapons: action.payload }, characterIsSaved: false }
        case RELOAD_WEAPON:
            return { ...state, character: { ...state.character, ranged_weapons: action.payload }, characterIsSaved: false }

        case SAVE_CHARACTER + '_REJECTED':
            alert( 'Your character was not saved correctly. Make sure you are connected to the internet and try again.' )
            return { ...state, characterIsSaved: false };
        case SAVE_CHARACTER + '_PENDING':
            return { ...state, characterIsSaved: 'pending' };
        case SAVE_CHARACTER + '_FULFILLED':
            console.log( 'Fulfilled!!' )
            return { ...state, characterIsSaved: action.payload };

        default:
            return state;
    }
}

export function importCharacter( character ) {

    return {
        type: IMPORT_CHARACTER,
        payload: character
    }
}

export function updateInfo( input ) {
    const{ name, value } = input.target

    return {
        type: UPDATE_INFO,
        payload: { name, value }
    }
}

export function assignCheck( checkedArr ) {
    console.log( {checkedArr} )

    return {
        type: ASSIGN_CHECK,
        payload: checkedArr
    }
}

export function fireWeapon( index, weapons ) {
    // console.log({ weapons, atIndex: weapons[index] })

    if( weapons[index][1] > 0 )
        weapons[index][1] = --weapons[index][1]
    // console.log( { weapons } )

    return {
        type: FIRE_WEAPON,
        payload: weapons
    }
}

export function reloadWeapon( index, weapons, ammo ) {

    if( weapons[index][1] >= 0 && weapons[index][1] !== null )
        weapons[index][1] = ammo

    return {
        type: RELOAD_WEAPON,
        payload: weapons
    }
}

export function saveCharacter( character ) {
    let body = character

    console.log( 'Character saved to Database from Redux' )

    let saved = axios.put( `/api/smallUpdateCharacter/${character.cid}`, body )
        .then( () => {
            console.log( 'character updated!' )
            return true
         } )

    return {
        type: SAVE_CHARACTER,
        payload: saved
    }
}