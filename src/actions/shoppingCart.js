import {ADD_CART, REMOVE_CART} from './types';

export const addCart = (item) => dispatch => {
    return dispatch({
       type: ADD_CART,
       payload : item
    })
}

export const removeFromCart = (item) => dispatch => {
    return dispatch({
       type: REMOVE_CART,
       payload : item
    })
}