import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from '../actions/shoppingCart'


class CheckoutPage extends Component{

    fullItemRemoval = (id, quantity) => {
        for (let i = 0; i < quantity; i++) {
            this.props.removeFromCart(id, true)
        }
    }

    render(){
        const itemsInCart = !this.props.cart? "Loading" : this.props.cart.map((item, index)=>{
            if(item.quantity > 0 || item.quantity2 > 0){
                return(
                    <div key={index}>
                        <div style={style.imgContainer}>
                            <img style={style.imgStyle} src={`http://localhost:3001/${item.img}`}/>
                            <button style={style.removeBtn} onClick={()=>this.fullItemRemoval(item.id, item.quantity)}>Remove</button>
                        </div>
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

const style = {
    imgContainer:{
        border: '1px solid black',
        width : '300px'
    },
    imgStyle:{
        height:'300px',
        display: 'block',
        margin: 'auto'
    },
    removeBtn:{
        display:'block'
    }
}

const mapStateToProps = (state) => ({
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart,
    cartCount : state.shoppingCart.cartCount
});

export default connect(mapStateToProps, {removeFromCart})(CheckoutPage)