import {createStore , combineReducers, compose, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import pokeReducer from './pokeDuks'
import productoReducer from './productosDuks'

const rootReducer = combineReducers({
    pokemons:pokeReducer,
    productos:productoReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    export default function generateStore(){
        const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
        return store;
    }