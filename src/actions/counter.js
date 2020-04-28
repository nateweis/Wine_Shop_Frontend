import {ADD} from './types';

export const add = () => dispatch => {
    return dispatch({
       type: ADD
    })
}
