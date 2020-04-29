import {ADD_CART, REMOVE_CART} from '../actions/types'
let initState = {
        total: 0,
        cart : [{
            name: "red",
            sku: "001",
            price: "30.00",
            currency: "USD",
            quantity: 0
        },
        {
            name: "white",
            sku: "002",
            price: "22.00",
            currency: "USD",
            quantity: 0
        }
        ]
}

const cartReducer = (state = initState, action) => {

        if(action.type === ADD_CART) {

            let selected;
            for (let i = 0; i < state.cart.length; i++) {
                if(state.cart[i].name === action.payload){
                  
                    selected = i

                    break; 
                } 
                       
            }

            
            const newTotal = (state.total += parseFloat(state.cart[selected].price))

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


            const newTotal = (state.total -= parseFloat(state.cart[selected].price))

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