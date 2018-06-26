import { createStore, combineReducers } from 'redux';
import reducer from './redux/shipReducer';
import authReducer from './redux/authReducer';

let reducers = combineReducers({
    ship: reducer,
    auth: authReducer
})

export default createStore( reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );