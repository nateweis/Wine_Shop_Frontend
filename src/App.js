import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import logo from './logo.svg';
import PayForm from './components/PayForm';
import ApprovePayment from './components/ApprovePayment';
import HomePage from './components/HomePage';


class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      
    }
  }

  

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={()=> <Redirect to="/Home" />} />
          <Route path="/Home" exact render={({history})=><HomePage push={history.push} />} />

          <Route path="/payform" exact render={({history})=><PayForm history={history.push} />} />
  
          <Route path="/good" exact render={({history})=><ApprovePayment push={history.push} />} />
  
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