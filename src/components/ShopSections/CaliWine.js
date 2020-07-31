import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addCart, removeFromCart} from '../../actions/shoppingCart'


class CaliWine extends Component{
    constructor(props) {
        super(props)
        this.state = {val:1}
    }

    changeBtnVal = (e) => {
        console.log(e.target.value)
        // console.log(e.target.type)
        // console.log(e.currentTarget.children[1].style.opacity)
        // e.target.innerHTML = "New text!"
        // e.target.value = 3

        if(e.target.type === 'submit'){e.currentTarget.children[1].style.opacity = '100'}
        else{
            e.currentTarget.children[0].innerHTML = `Qty: ${e.target.value} +`
            e.currentTarget.children[1].style.opacity = '.01'
        }
        
    }

    render(){
        let filteredCart = this.props.cart
        if(Object.keys(this.props.options).length){

            filteredCart = this.props.filter
            
        }
        
        
        

        const storeOptions = filteredCart? filteredCart.map((item, index) => {
            if(item.origin === 'california'){
                return(
                    
                        <div className="cart-option" key={index}>
                                <div className="display-image"><img src={`http://localhost:3001/${item.img}`}/></div>
        
                                <h3 className="display-title">{item.name}</h3>
        
                                {item.description?<div className="display-description"> <em> {item.description}</em> </div> : ""}
        
                                {item.notes?<div className="display-notes"> {item.notes} </div>: ""} 
        
                                <div className="display-tags">
                                    {!item.tags ? "" : item.tags.map((tag, index)=>{return(<span key={index} className={tag}> {tag} </span>)})}
                                </div>
        
                                {item.type == "wine"? <div className="display-mevushal">
                                    {item.mevushal? "Mevushal" : "Non-Mevushal"}
                                </div> : ""}
        
                                <div className="display-price">
                                    <strong>${item.price}</strong> 
                                    <button onClick={()=>this.props.removeFromCart(item.id, true)}>-</button> 
                                    <input type="number" value={item.quantity} disabled/> 
                                    <button onClick={()=>this.props.addCart(item.id, true)}>+</button>
                                </div>

                                    {/* ************ attempting the amazon style dropdown *************** */}
                                <div>
                                    <strong>${item.price}</strong>

                                    <span className="drop-down-btn-container" onClick={this.changeBtnVal}>
                                        <button >Qty: {this.state.val} +</button>
                                        <select name="" id="" className="drop-down-btn-options ">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </span>
                                    
                                    <button>Add to Cart</button>
                                </div>
                                
        
                                {item.price2? <>
                                    {item.name2?<h3 className="display-second-title"> {item.name2} </h3>: ""}
                                    <div className="display-second-price">
                                        <strong>${item.price2}</strong>
                                        <button onClick={()=>this.props.removeFromCart(item.id, false)}>-</button> 
                                        <input type="number" value={item.quantity2} disabled/> 
                                        <button onClick={()=>this.props.addCart(item.id, false)}>+</button>
                                    </div> 
                                </> : ""}
                            </div>
                    
                    )
                }
            
            }
        ) : "Loading......";
        return(
            <>
                <h2 style={style.h2}>California Wine</h2>
                <div className="shopping-container">
                    {storeOptions}
                </div>    
                        
            </>
        )
    }
}

const style = {
    h2:{
        color: 'purple',
        backgroundColor: 'rgba(0,0,0,.2)'
    }
}

CaliWine.protoTypes = {
    counter : PropTypes.number,
    total : PropTypes.number,
    cart : PropTypes.array,
    addCart : PropTypes.func,
    removeFromCart: PropTypes.func,
    filter: PropTypes.array
}

const mapStateToProps = (state) => ({
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart,
    filter : state.filter.filteredCart,
    options : state.filter.options
});


export default connect(mapStateToProps,{addCart, removeFromCart})(CaliWine)