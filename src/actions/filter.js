import {CREATE_FILTER_OBJECT} from './types'

export const addToFilter = (obj) => dispatch => {
    return dispatch({
        type: CREATE_FILTER_OBJECT,
        payload: obj
    })
}
