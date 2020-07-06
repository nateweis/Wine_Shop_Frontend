// REDUCER -> DESCRIBES HOW YOUR ACTION EFFECTS THE STATE
import {combineReducers} from 'redux';

import counterReducer from './counter';
import shoppingCart from './shoppingCart';
import filter from './filter' 


const allReducers = combineReducers({
    counter : counterReducer,
    shoppingCart,
    filter
})

export default allReducers;