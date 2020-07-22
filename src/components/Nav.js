import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import LocalStorage from '../models/LocalStorage';




class Nav extends Component{

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
                if(item.quantity2 > 0){
                    const wine ={
                        name: item.name,
                        sku: item.sku,
                        price: item.price2,
                        currency: item.currency,
                        quantity: item.quantity2
                    }
                    wine.price = (wine.price + "")
                    if(wine.sku < 10) wine.sku = "00" + wine.sku
                    else if(wine.sku < 100) wine.sku = "0" + wine.sku
                    else wine.sku = "" + wine.sku

                    obj.cart.push(wine)
                }
            });

            this.goToPayPal(obj);
            // console.log(obj)
        }
        
    }

    render(){
        return(
            <>
                <div style={style.spacer}>
                    <div style={style.navContainer}>
                        <h2>Nav Bar</h2>
                        <form onSubmit={this.submitPayment}>
                            Total: {this.props.total} <br/>
                            <input type="submit" value="Buy"/>
                        </form>
                        <button onClick={()=>this.props.history.push("/wine-store/checkout")}>Cart: {this.props.cartCount}</button>
                    </div> 
                </div>             
            </>
        )
    }
}

const style = {
    navContainer:{
        border: "1px solid black",
        position: 'fixed',
        backgroundColor: 'pink'
    },
    spacer:{
        height: '150px',
        position: 'relative'
    }
}

const mapStateToProps = (state) => ({
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart,
    cartCount : state.shoppingCart.cartCount
});

export default withRouter(connect(mapStateToProps, {})(Nav))