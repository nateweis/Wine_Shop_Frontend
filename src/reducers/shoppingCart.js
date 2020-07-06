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

            
            const newTotal = (action.primary ? (state.total += state.cart[selected].price) : (state.total += state.cart[selected].price2))

            let newCart = state.cart
            let updateCart = state.cart[selected]
            let newQuantity = (action.primary ? state.cart[selected].quantity : state.cart[selected].quantity2)
            
            newQuantity++
            action.primary ? updateCart.quantity = newQuantity : updateCart.quantity2 = newQuantity
            newCart[selected] = updateCart
            
            
            return {
                cart: newCart,
                total: newTotal
            };
        }
        else if ( action.type === REMOVE_CART){
            
            let selected;
            for (let i = 0; i < state.cart.length; i++) {
                if(action.primary && state.cart[i].name === action.payload && state.cart[i].quantity > 0){
                
                    selected = i

                    break; 
                }
                else if(!action.primary && state.cart[i].name === action.payload && state.cart[i].quantity2 > 0){
                    selected = i

                    break; 
                }
                else selected = -10 
                    
            }

            if(selected === -10) return state;


            const newTotal = (action.primary ? (state.total -= state.cart[selected].price) : (state.total -= state.cart[selected].price2))

            let newCart = state.cart
            let updateCart = state.cart[selected]
            let newQuantity = (action.primary ? state.cart[selected].quantity : state.cart[selected].quantity2)
            
            newQuantity--
            action.primary ? updateCart.quantity = newQuantity : updateCart.quantity2 = newQuantity
            newCart[selected] = updateCart
            
            
            return {
                cart: newCart,
                total: newTotal
            };
        }
        else return state;  
              
    
}

export default cartReducer;