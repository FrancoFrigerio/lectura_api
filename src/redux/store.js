import {createStore , combineReducers, compose, applyMiddleware} from 'redux'

import thunk from 'redux-thunk'

import pokeReducer from './pokeDuks'
import productoReducer from './productosDuks'
import usuarioReducer ,{getUserStorage} from './userDucks'
const rootReducer = combineReducers({
    pokemons:pokeReducer,
    productos:productoReducer,
    usuario:usuarioReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    export default function generateStore(){
        const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
        getUserStorage()(store.dispatch) //para que ejecute el dispatch correcto
        return store;
    }