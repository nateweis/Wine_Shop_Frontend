import React, {Component} from 'react';
import LocalStorage from '../models/LocalStorage'


class ApprovePayment extends Component{


    componentDidMount(){       
        this.paymentAccepted()
    }

    paymentAccepted = () => {
        fetch('http://localhost:3001/pay'+ this.props.location.search + "&cartTotal=" + LocalStorage.getTotal() ,{method: 'GET'})
        .then((res) => {
            res.json()
            .then((data) => {console.log(data); LocalStorage.removeTotal()},(err) => {console.log(err);})
        })
        
    }

    render(){
        return(
            <>
                <h3>Hopfully It Went through</h3>
                <button onClick={()=>this.props.push('/wine-store/home')}>Back to Home Page</button>
            </>
        )
    }
}

export default ApprovePayment