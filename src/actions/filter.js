import {CREATE_FILTER_OBJECT, CREATE_FILTER_CART} from './types'

export const addToFilter = (obj) => dispatch => {
    return dispatch({
        type: CREATE_FILTER_OBJECT,
        payload: obj
    })
}

export const makeFilterCart = (arr) => dispatch => {
    return dispatch({
        type: CREATE_FILTER_CART,
        payload: arr
    })
}
