import {ADD} from '../actions/types'
let initState = 0;

const counterReducer = (state = initState, action) => {
    switch(action.type){
        case ADD :
            return state + 1;
        case "REDUCE": 
            return state - 1;
        default : 
            return state;    
    }
}

export default counterReducer;