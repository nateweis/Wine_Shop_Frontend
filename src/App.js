import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import logo from './logo.svg';
import PayForm from './components/PayForm';
import ApprovePayment from './components/ApprovePayment';
import HomePage from './components/HomePage';
import CheckoutPage from './components/CheckoutPage';
import Nav from './components/Nav';


class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }

  componentDidMount(){
    document.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.stopPropagation()
      }
    )
    document.addEventListener('drop', (e) => {
      e.preventDefault()
      e.stopPropagation()
      }
    )
  }
  

  render(){
    return (
      <BrowserRouter>
          <Route path="/wine-store" component={Nav} />
        <Switch>
          <Route path="/" exact render={()=> <Redirect to="/wine-store/home" />} />
          <Route path="/wine-store/home" exact render={({history})=><HomePage push={history.push} />} />

          <Route path="/wine-store/payform" exact render={({history})=><PayForm history={history.push} />} />
          <Route path="/wine-store/checkout" exact render={({history})=><CheckoutPage history={history.push} />} />
  
          <Route path="/wine-store/good" exact render={({history, location})=><ApprovePayment push={history.push} location={location} />} />
  
          <Route render={()=>{return (<div>404 page not found</div>)}} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;


// ///////////////////////////////////////////////
// Heroku = https://artbydev.herokuapp.com
// ///////////////////////////////////////////////