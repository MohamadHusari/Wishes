import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
// import Landing from './components/Landing';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from "./components/Router";


ReactDOM.render(<Router />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
