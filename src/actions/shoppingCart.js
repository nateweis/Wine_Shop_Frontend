import {ADD_CART, REMOVE_CART, POPULATE_STORE} from './types';

export const fillStore = () => dispatch => {
    fetch('http://localhost:3001/wine',{method:'GET'})
        .then((res)=>{res.json()
        .then((data)=>{
            dispatch({
                type: POPULATE_STORE,
                payload: data
            })
        })
        })
}

export const addCart = (item, primary) => dispatch => {
    return dispatch({
       type: ADD_CART,
       payload : item,
       primary
    })
}

export const removeFromCart = (item, primary) => dispatch => {
    return dispatch({
       type: REMOVE_CART,
       payload : item,
       primary
    })
}