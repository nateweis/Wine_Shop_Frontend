import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LocalStorage from '../models/LocalStorage';
import {addCart, removeFromCart, fillStore} from '../actions/shoppingCart'

import ItalyWine from './ShopSections/ItalyWine';
import CaliWine from './ShopSections/CaliWine';
import FilterSearchBar from './FilterSearchBar'




class PayForm extends Component{
    constructor(props) {
        super(props)
        this.state = {}
    }

    // componentWillReceiveProps(newProps){

    // }

    getWines = () => { 
        fetch('http://localhost:3001/wine',{method:'GET'})
        .then((res)=>{res.json()
        .then((data)=>console.log(data))
        })
    }


    
    render(){
        // const counter = useSelector(state => state.counter)
        return(
            <>

                <FilterSearchBar />
                <ItalyWine /> 
                <CaliWine />    
                {/* <form onSubmit={this.submitPayment}>
                    Total: {this.props.total} <br/>
                    <input type="submit" value="Buy"/>
                </form> */}

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
    total : state.shoppingCart.total,
    cart : state.shoppingCart.cart
});




export default connect(mapStateToProps, {addCart, removeFromCart, fillStore})(PayForm)