import {ADD_CART, REMOVE_CART, POPULATE_STORE} from '../actions/types'
let initState = {
        total: 0,
        cart : []
}

const cartReducer = (state = initState, action) => {

        if(action.type === POPULATE_STORE){
            return{
                ...state,
                cart : action.payload
            }
        }
        else if(action.type === ADD_CART) {

            let selected;
            for (let i = 0; i < state.cart.length; i++) {
                if(state.cart[i].name === action.payload){
                  
                    selected = i

                    break; 
                } 
                       
            }

            
            const newTotal = (state.total += state.cart[selected].price)

            let newCart = state.cart
            let updateCart = state.cart[selected]
            let newQuantity = state.cart[selected].quantity
            
            newQuantity++
            updateCart.quantity = newQuantity
            newCart[selected] = updateCart
            
            
            return {
                cart: newCart,
                total: newTotal
            };
        }
        else if ( action.type === REMOVE_CART){
            
            let selected;
            for (let i = 0; i < state.cart.length; i++) {
                if(state.cart[i].name === action.payload && state.cart[i].quantity > 0){
                
                    selected = i

                    break; 
                } 
                    
            }


            const newTotal = (state.total -= state.cart[selected].price)

            let newCart = state.cart
            let updateCart = state.cart[selected]
            let newQuantity = state.cart[selected].quantity
            
            newQuantity--
            updateCart.quantity = newQuantity
            newCart[selected] = updateCart
            
            
            return {
                cart: newCart,
                total: newTotal
            };
        }
        else return state;  
              
    
}

export default cartReducer;