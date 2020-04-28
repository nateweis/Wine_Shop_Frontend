import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

////////// STORE -> GLOBALIZED STATE
import {createStore, applyMiddleware, compose} from 'redux'; 
import allReducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const initState = {};
const middleware = [thunk]

const store = createStore(
    allReducers,
    initState,
    compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );

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



/////// (This is a way to see in the console)
// store.subscribe(()=>console.log(store.getState()))

////////// DISPATCH -> ACTUALLY EXECUTING THE ACTION 


ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
