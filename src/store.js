import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './redux/authReducer';
import characterReducer from './redux/characterReducer';
import reducer from './redux/shipReducer';

const reducers = combineReducers({
    auth: authReducer,
    character: characterReducer,
    ship: reducer
})

export default createStore(
    reducers,
    compose(
        applyMiddleware( promiseMiddleware() ),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);