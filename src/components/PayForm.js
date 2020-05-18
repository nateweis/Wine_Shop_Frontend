import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LocalStorage from '../models/LocalStorage';
import {addCart, removeFromCart, fillStore} from '../actions/shoppingCart'




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

    getWines = () => { 
        fetch('http://localhost:3001/wine',{method:'GET'})
        .then((res)=>{res.json()
        .then((data)=>console.log(data))
        })
    }

   
    


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
                    const wine ={
                        name: item.name,
                        sku: item.sku,
                        price: item.price,
                        currency: item.currency,
                        quantity: item.quantity
                    }
                    wine.price = (wine.price + "")
                    if(wine.sku < 10) wine.sku = "00" + wine.sku
                    else if(wine.sku < 100) wine.sku = "0" + wine.sku
                    else wine.sku = "" + wine.sku

                    obj.cart.push(wine)
                }
            });

            // this.goToPayPal(obj);
            console.log(obj)
        }
        
    }

    
    render(){
        // const counter = useSelector(state => state.counter)
        return(
            <>
            {this.props.cart? this.props.cart.map((item, index)=>{
                return(
                    <div className="cart-option" key={index}>
                        <img src={`http://localhost:3001/${item.img}`}/>
                        {item.name} : ${item.price} <button onClick={()=>this.props.removeFromCart(item.name)}>-</button> 
                        <input type="number" value={item.quantity} disabled/> 
                        <button onClick={()=>this.props.addCart(item.name)}>+</button>
                    </div>
                )
            }) : "Loading......" }
                
                <form onSubmit={this.submitPayment}>
                    Total: {this.props.total} <br/>
                    <input type="submit" value="Buy"/>
                </form>

                <button onClick={this.props.fillStore}>Get Wines</button>
            </>
        )
    }
}

PayForm.protoTypes = {
    counter : PropTypes.number,
    total : PropTypes.number,
    cart : PropTypes.array,
    addCart : PropTypes.func,
    removeFromCart: PropTypes.func,
    fillStore: PropTypes.func
}

const mapStateToProps = (state) => ({
    counter : state.counter,
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart
});




export default connect(mapStateToProps, {addCart, removeFromCart, fillStore})(PayForm)