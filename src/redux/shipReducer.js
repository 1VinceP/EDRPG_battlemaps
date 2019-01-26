let initialState = {
    visible: [],
    combatBg: 'space',
    navOpen: false,
    user: {
        username: '',
        email: '',
        id: ''
    }
}

// SHIP TYPES
const ADD_SHIP = 'ADD_SHIP'
    , MANAGE_BG = 'MANAGE_BG'
    , HANDLE_NAV = 'HANDLE_NAV'
    , UPDATE_POS = 'UPDATE_POS'
    , CHANGE_SIDES = 'CHANGE_SIDES'
    , HANDLE_NAME = 'HANDLE_NAME'
    , HANDLE_ACTIVE = 'HANDLE_ACTIVE'

let newVisible

export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case ADD_SHIP:
            return { ...state, visible: [...state.visible, action.payload] }
        case MANAGE_BG:
            return { ...state, combatBg: action.payload }
        case HANDLE_NAV:
            return { ...state, navOpen: action.payload }
        case UPDATE_POS:
            newVisible = [...state.visible]
            for( let i = 0; i < newVisible.length ; i++ ) {
                if( newVisible[i].index === action.payload.id ) {
                    newVisible[i].deltaPosition.x = action.payload.x
                    newVisible[i].deltaPosition.y = action.payload.y
                }
            }
            return { ...state, visible: newVisible }
        case CHANGE_SIDES:
            newVisible = [...state.visible]
            for( let i = 0; i < newVisible.length; i++ ) {
                if( newVisible[i].index === action.payload.id ) {
                    newVisible[i].side = action.payload.side
                }
            }
            return { ...state, visible: newVisible }
        case HANDLE_NAME:
            newVisible = [...state.visible]
            for( let i = 0; i < newVisible.length; i++ ) {
                if( newVisible[i].index === action.payload.id )
                    newVisible[i].name = action.payload.val
            }
            return { ...state, visible: newVisible }
        case HANDLE_ACTIVE:
            newVisible = [...state.visible]
            for( let i = 0; i < newVisible.length; i++ ) {
                if( newVisible[i].index === action.payload.id )
                    newVisible[i].active = action.payload.active
            }
            return { ...state, visible: newVisible }

        default:
            return state
    }
}

export function addShip( ship, index ) {

    ship.side = 'friendly'
    ship.active = ''
    ship.deltaPosition = { x: 0, y: 0 }
    ship.index = index

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

export function handleNav( val ) {

    return {
        type: HANDLE_NAV,
        payload: val
    }
}

export function updateShipPos( { id, x, y } ) {

    return {
        type: UPDATE_POS,
        payload: { id, x, y }
    }
}

export function changeSides( id, side ) {

    return {
        type: CHANGE_SIDES,
        payload: { id, side }
    }
}

export function handleName( id, val ) {

    return {
        type: HANDLE_NAME,
        payload: { id, val }
    }
}

export function handleActive( id, active ) {

    return {
        type: HANDLE_ACTIVE,
        payload: { id, active }
    }
}