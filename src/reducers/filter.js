import {CREATE_FILTER_OBJECT, CREATE_FILTER_CART} from '../actions/types'

const initState = {options: {}, filteredCart: []}
const filterReducer = (state = initState, action) => {
    switch(action.type){
        case CREATE_FILTER_OBJECT:
            return {...state, options : action.payload};
        case CREATE_FILTER_CART:
            console.log(state)
            return state;    
        default:
            return state;
    }
}

export default filterReducer   
