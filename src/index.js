import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

////////// STORE -> GLOBALIZED STATE
import {createStore} from 'redux'; 

////////// ACTION -> DESCRIPES WHAT YOU WANT TO DO

const add = () => { // this action will be named add
    return{
        type: 'ADD' //type is essentally name of action (can really call it whatever)
    }
} // actions boil down to functions that return obj

const reduce = () => {
    return{
        type: 'REDUCE'
    }
}

 

////////// REDUCER -> DESCRIBES HOW YOUR ACTION EFFECTS THE STATE

const counter = (state = 0, action) => {
    switch(action.type){
        case "ADD": 
            return state + 1;
        case "REDUCE" :
            return state - 1;    
    }
}

let store = createStore(counter);

/////// (This is a way to see in the console)
store.subscribe(()=>console.log(store.getState()))

////////// DISPATCH -> ACTUALLY EXECUTING THE ACTION 
store.dispatch(add());
store.dispatch(reduce());
store.dispatch(add());
store.dispatch(add());

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
