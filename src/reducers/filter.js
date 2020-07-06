import {CREATE_FILTER_OBJECT} from '../actions/types'

const filterReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_FILTER_OBJECT:
            return action.payload;
        default:
            return state;
    }
}

export default filterReducer   
