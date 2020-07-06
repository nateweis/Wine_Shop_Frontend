import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addCart, removeFromCart} from '../../actions/shoppingCart'


class ItalyWine extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    populateFilterCart = () => {
        
    }
    

    render(){
        let filteredCart = []
        const filterKeys = Object.keys(this.props.filter);
        
        filterKeys.forEach((key) => {

                    if(this.props.filter[key].length > 0){
                        this.props.filter[key].forEach((f) => {
                                let arr = this.props.cart? this.props.cart.filter((item) => {
                                    return  item[key].indexOf(f) !== -1
                                    }
                                ) : null; 
                                filteredCart = filteredCart.concat(arr)   
                            }
                        )
                    }

            }
        )
        
        
        

        const storeOptions = filteredCart? filteredCart.map((item, index) => {
            if(item.origin === 'italy'){
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
                                    <button onClick={()=>this.props.removeFromCart(item.name, true)}>-</button> 
                                    <input type="number" value={item.quantity} disabled/> 
                                    <button onClick={()=>this.props.addCart(item.name, true)}>+</button>
                                </div>
                                
        
                                {item.price2? <>
                                    {item.name2?<h3 className="display-second-title"> {item.name2} </h3>: ""}
                                    <div className="display-second-price">
                                        <strong>${item.price2}</strong>
                                        <button onClick={()=>this.props.removeFromCart(item.name, false)}>-</button> 
                                        <input type="number" value={item.quantity2} disabled/> 
                                        <button onClick={()=>this.props.addCart(item.name, false)}>+</button>
                                    </div> 
                                </> : ""}
                            </div>
                    
                    )
                }
            
            }
        ) : "Loading......";

        return(
            <>
                <h2 style={style.h2}>Italy Wine</h2>
                {/* <div>{storeOptions}</div> */}
                <div className="shopping-container">
                    {storeOptions}
                </div>
                
            </>
        )
    }
}

const style = {
    h2:{
        color: 'green',
        backgroundColor: 'rgba(0,0,0,.2)'
    }
}

ItalyWine.protoTypes = {
    counter : PropTypes.number,
    total : PropTypes.number,
    cart : PropTypes.array,
    addCart : PropTypes.func,
    removeFromCart: PropTypes.func,
    filter: PropTypes.object
}

const mapStateToProps = (state) => ({
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart,
    filter : state.filter
});


export default connect(mapStateToProps, {addCart, removeFromCart})(ItalyWine)