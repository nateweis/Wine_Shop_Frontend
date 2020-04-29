import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LocalStorage from '../models/LocalStorage';
import {addCart, removeFromCart} from '../actions/shoppingCart'




class PayForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            cart : [{
                name: "spiral",
                sku: "001",
                price: "75.00",
                currency: "USD",
                quantity: 0
            },
            {
                name: "monograms",
                sku: "002",
                price: "200.00",
                currency: "USD",
                quantity: 0
            }
            ]
        }
    }

    // componentWillReceiveProps(newProps){

    // }


    goToPayPal = (obj) => {
        fetch('http://localhost:3001/pay',{
            method: 'POST',
            headers:{'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        .then((res) => {
            res.json()
            .then((data)=>{
                if(data.link){
                    LocalStorage.storeTotal(obj.total)
                    window.location.assign(data.link)
                }
            },(err)=>{console.log(err)})
        })
    }
    

    submitPayment = (e) => {
        e.preventDefault();

        if(this.props.total === 0){
            alert("Shopping Cart is Empty")
        }else{
            const obj = {
                total: this.props.total + "",
                cart: []
            }
            this.props.cart.forEach(item => {
                if(item.quantity > 0){
                    obj.cart.push(item)
                }
            });

            this.goToPayPal(obj);
            // console.log(obj)
        }
        
    }

    
    render(){
        // const counter = useSelector(state => state.counter)
        return(
            <>
                <div className="cart-option">
                    Red Wine : $30 <button onClick={()=>this.props.removeFromCart("red")}>-</button> 
                    <input type="number" value={this.props.cart[0].quantity} disabled/> 
                    <button onClick={()=>this.props.addCart("red")}>+</button>
                </div>
                <div className="cart-option">
                     White Wine : $22 <button onClick={()=>this.props.removeFromCart("white")}>-</button> 
                    <input type="number" value={this.props.cart[1].quantity} disabled/> 
                    <button onClick={()=>this.props.addCart("white")}>+</button>
                </div>
                <form onSubmit={this.submitPayment}>
                    Total: {this.props.total} <br/>
                    <input type="submit" value="Buy"/>
                </form>

            </>
        )
    }
}

PayForm.protoTypes = {
    counter : PropTypes.number,
    total : PropTypes.number,
    cart : PropTypes.array,
    addCart : PropTypes.func,
    removeFromCart: PropTypes.func
}

const mapStateToProps = (state) => ({
    counter : state.counter,
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart
});




export default connect(mapStateToProps, {addCart, removeFromCart})(PayForm)