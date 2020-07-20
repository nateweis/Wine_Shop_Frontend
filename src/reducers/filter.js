import {CREATE_FILTER_OBJECT, CREATE_FILTER_CART} from '../actions/types'

const initState = {options: {}, filteredCart: []}
const filterReducer = (state = initState, action) => {
    switch(action.type){
        case CREATE_FILTER_OBJECT:
            return {...state, options : action.payload};
        case CREATE_FILTER_CART:
            const filterKeys = Object.keys(state.options);
            let tempFilterArr = action.payload
            
            filterKeys.forEach((key) => {
                
                if(state.options[key].length > 0){
                    let holder = []
                    state.options[key].forEach((f) => {
                            let arr = tempFilterArr? tempFilterArr.filter((item) => {
                                return  item[key].indexOf(f) !== -1
                                }
                            ) : null; 
                            holder = holder.concat(arr) 
                            
                        }
                    )
                    tempFilterArr = holder
                }

                }
            )
            return {...state, filteredCart: tempFilterArr};    
        default:
            return state;
    }
}

export default filterReducer   
