import React, {Component} from 'react';
import LocalStorage from '../models/LocalStorage'


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

    

    cartAdd = (item) => {
        console.log(item)
        for (let i = 0; i < this.state.cart.length; i++) {
            if(this.state.cart[i].name === item){
              
                this.setState((pre) => {
                    const update = pre["cart"][i]
                    update.quantity += 1 
                    // pre["cart"].splice(i, 1)
                    // pre["cart"] = [...pre["cart"], update]
                    pre["cart"][i] = update

                    pre["total"] += parseFloat(pre["cart"][i].price)
                    return{cart: pre["cart"], total: pre["total"]}
                });

                break; 
            }          
        }

    }

    cartRemove = (item) => {
        for (let i = 0; i < this.state.cart.length; i++) {
            if(this.state.cart[i].name === item && this.state.cart[i].quantity > 0){
              
                this.setState((pre) => {
                    const update = pre["cart"][i]
                    update.quantity -= 1 
                    // pre["cart"].splice(i, 1)
                    // pre["cart"] = [...pre["cart"], update]
                    pre["cart"][i] = update

                    pre["total"] -= parseFloat(pre["cart"][i].price)
                    return{cart: pre["cart"], total: pre["total"]}
                });

                break; 
            }  
        }

    }

    goToPayPal = (obj) => {
        fetch('https://artbydev-backend.herokuapp.com/pay',{
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

        if(this.state.total === 0){
            alert("Shopping Cart is Empty")
        }else{
            const obj = {
                total: this.state.total + "",
                cart: []
            }
            this.state.cart.forEach(item => {
                if(item.quantity > 0){
                    obj.cart.push(item)
                }
            });

            this.goToPayPal(obj);
            // console.log(obj)
        }
        
    }

    render(){
        return(
            <>
                <div className="cart-option">
                    Spiral : $75 <button onClick={()=>this.cartRemove("spiral")}>-</button> 
                    <input type="number" value={this.state.cart[0].quantity} disabled/> 
                    <button onClick={()=>this.cartAdd("spiral")}>+</button>
                </div>
                <div className="cart-option">
                     Monograms : $200 <button onClick={()=>this.cartRemove("monograms")}>-</button> 
                    <input type="number" value={this.state.cart[1].quantity} disabled/> 
                    <button onClick={()=>this.cartAdd("monograms")}>+</button>
                </div>
                <form onSubmit={this.submitPayment}>
                    Total: {this.state.total} <br/>
                    <input type="submit" value="Buy"/>
                </form>
            </>
        )
    }
}

export default PayForm