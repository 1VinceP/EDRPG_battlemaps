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
        units: 0,
        notes: ''
    },
    characterIsSaved: true
}

const IMPORT_CHARACTER = 'IMPORT_CHARACTER'
    , UPDATE_INFO = 'UPDATE_INFO'
    , ASSIGN_CHECK = 'ASSIGN_CHECK'
    , USE_KARMA = 'USE_KARMA'
    , FIRE_WEAPON = 'FIRE_WEAPON'
    , RELOAD_WEAPON = 'RELOAD_WEAPON'
    , SAVE_CHARACTER = 'SAVE_CHARACTER'
    , UPDATE_ALIAS = 'UPDATE_ALIAS'
    , SELL_EQUIP = 'SELL_EQUIP'

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case IMPORT_CHARACTER:
            return { ...state, character: action.payload };

        case UPDATE_INFO:
            const { name, value } = action.payload
            return { ...state, character: { ...state.character, [name]: value }, characterIsSaved: false };
        case ASSIGN_CHECK:
            return { ...state, character: { ...state.character, checked: action.payload }, characterIsSaved: false };
        case USE_KARMA:
            return { ...state, character: { ...state.character, current_karma: state.character.current_karma - action.payload } }
        case FIRE_WEAPON:
            return { ...state, character: { ...state.character, ranged_weapons: action.payload }, characterIsSaved: false }
        case RELOAD_WEAPON:
            return { ...state, character: { ...state.character, ranged_weapons: action.payload }, characterIsSaved: false }

        case SELL_EQUIP + '_REJECTED':
            alert( 'Your item was not successfully sold and has been returned to your inventory. Please try again.' )
            return state;
        case SELL_EQUIP + '_FULFILLED':
            const { equipment: sellE, kind: sellK, value: sellV } = action.payload;
            return { ...state, character: { ...state.character, [sellK]: sellE, credits: state.credits += sellV } }

        case SAVE_CHARACTER + '_REJECTED':
            alert( 'Your character was not saved correctly. Make sure you are connected to the internet and try again.' )
            return { ...state, characterIsSaved: false };
        case SAVE_CHARACTER + '_PENDING':
            return { ...state, characterIsSaved: 'pending' };
        case SAVE_CHARACTER + '_FULFILLED':
            console.log( 'Fulfilled!!' )
            return { ...state, characterIsSaved: action.payload };

        case UPDATE_ALIAS:
            const { equipment, kind } = action.payload
            return { ...state, character: { ...state.character, [kind]: equipment }, characterIsSaved: false }

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

export function useKarma( current, cost ) {

    if( current - cost < 0 || current === 0 ) {
        console.log( 'Not enough karma left' )
        cost = 0;
    }

    if( cost === 'All' )
        cost = current

    return {
        type: USE_KARMA,
        payload: cost
    }
}

export function fireWeapon( id, weapons ) {
    weapons = weapons.map( weapon => {
        if( weapon.id === id && weapon.current_ammo > 0 ) {
            --weapon.current_ammo
        }

        return weapon
    } )

    console.log( weapons )

    return {
        type: FIRE_WEAPON,
        payload: weapons
    }
}

export function reloadWeapon( id, weapons ) {
    weapons = weapons.map( weapon => {
        if( weapon.id === id && weapon.ammo !== 'N/A' ) {
            weapon.current_ammo = weapon.ammo
        }

        return weapon
    } )

    return {
        type: RELOAD_WEAPON,
        payload: weapons
    }
}

export function sellEquipment( id, cost, type, userid, cid ) {
    let value = prompt('Sell value (standard 70% of purchase cost)', Math.ceil(cost * .7))

    let equip = axios.delete(`/api/deleteWeapon/${userid}/${cid}/${id}`)
        .then( res => res.data )

    return {
        type: SELL_EQUIP,
        payload: { equip, type, value }
    }

}

export function saveCharacter( character, userid ) {

    console.log( 'Character saving to Database from Redux...', {character, userid} )

    let char = axios.put( `/api/saveCharacter/${userid}/${character.cid}`, character )
        .then( () => true );

    let ranged = character.ranged_weapons.forEach( (weapon, i) => {
        axios.put( `/api/saveRanged/${userid}/${character.cid}`, {userid, weapon} )
            .then( () => console.log( `weapon ${i} saved` ) );
    } );

    let melee = character.melee_weapons.forEach( (weapon, i) => {
        axios.put( `/api/saveMelee/${userid}/${character.cid}`, {userid, weapon} )
            .then( () => console.log( `melee ${i} saved` ) );
    } );


    let saved = Promise.all([char, ranged, melee])
        .then( () => {
            console.log( 'character updated!' );
            return true;
        } )

    return {
        type: SAVE_CHARACTER,
        payload: saved
    }
}

export function updateAlias( id, equipment, alias, kind ) {
    equipment = equipment.map( equip => {
        if( equip.id === id ) {
            equip.alias = alias
        }

        return equip
    } )

    return {
        type: UPDATE_ALIAS,
        payload: { equipment, kind }
    }
}