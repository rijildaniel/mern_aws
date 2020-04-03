import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './redux/reducers/reducers'
import './index.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import MainComponent from './components/maincomponent';

const history = createHistory();
let store = createStore(reducer, compose(applyMiddleware(routerMiddleware(history))));



ReactDOM.render(<Provider store={store}><Router history={history}> < MainComponent / ></Router> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();