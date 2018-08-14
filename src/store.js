import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './redux/authReducer';
import characterReducer from './redux/characterReducer';
import reducer from './redux/shipReducer';

let reducers = combineReducers({
    auth: authReducer,
    character: characterReducer,
    ship: reducer
})

export default createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware( promiseMiddleware() )
);