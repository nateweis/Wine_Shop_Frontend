import React, {Component} from 'react';
import {connect} from 'react-redux';


class CheckoutPage extends Component{



    render(){
        const itemsInCart = !this.props.cart? "Loading" : this.props.cart.map((item, index)=>{
            if(item.quantity > 0){
                return(
                    <div key={index}>
                        <img src={`http://localhost:3001/${item.img}`}/>
                    </div>
                )
            }
        })
        return(
            <>
                <h3>Checkout Page</h3>
                <button onClick={()=> this.props.history('/wine-store/payform')}>Back</button>
                {itemsInCart}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart,
    cartCount : state.shoppingCart.cartCount
});

export default connect(mapStateToProps, {})(CheckoutPage)