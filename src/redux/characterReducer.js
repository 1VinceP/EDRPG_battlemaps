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
        equipment: []
    }
}

const IMPORT_CHARACTER = 'IMPORT_CHARACTER'
    , UPDATE_INFO = 'UPDATE_INFO'

export default ( state = initialState, action ) => {
    switch( action.type ) {
        case IMPORT_CHARACTER:
            return { ...state, character: action.payload }
        case UPDATE_INFO:
            const { name, value } = action.payload
            return{ ...state, character: { ...state.character, [name]: value } }

        default:
            return state
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