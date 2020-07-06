import {CREATE_FILTER_OBJECT} from '../actions/types'
let initState = {}

const filterReducer = (state = initState, action) => {
    if(action.type === CREATE_FILTER_OBJECT) return action.payload
    else return state 
}

export default filterReducer   
