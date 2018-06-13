let initialState = {
    visible: [],
    combatBg: 'space-main'
}

const ADD_SHIP = 'ADD_SHIP'
const MANAGE_BG = 'MANAGE_BG'

export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case ADD_SHIP:
            return {...state, visible: [...state.visible, action.payload]}
        case MANAGE_BG:
            return {...state, combatBg: action.payload}

        default:
            return state
    }
}

export function addShip( ship ) {

    return {
        type: ADD_SHIP,
        payload: ship
    }
}

export function changeBackground( bg ) {

    return {
        type: MANAGE_BG,
        payload: bg
    }
}