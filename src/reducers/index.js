// REDUCER -> DESCRIBES HOW YOUR ACTION EFFECTS THE STATE
import {combineReducers} from 'redux';

import counterReducer from './counter';
import shoppingCart from './shoppingCart';


const allReducers = combineReducers({
    counter : counterReducer,
    shoppingCart
})

export default allReducers;