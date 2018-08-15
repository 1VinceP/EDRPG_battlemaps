let initialState = {
    user: {
        username: '',
        email: '',
        userid: '',
        auth_id: ''
    }
}


// USER TYPES
const SET_USER = 'SET_USER'

export default function reducer( state = initialState, action ) {
    switch( action.type ) {
        case SET_USER:
            return { ...state, user: action.payload }

        default:
            return state;
    }
}

export function setUser( user ) {

    return {
        type: SET_USER,
        payload: user
    }
}