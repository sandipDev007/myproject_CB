/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from '../src/pages/signIn/signin';
import Navigation from "./navigate";
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { HashRouter } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
  <Navigation/>, 
  
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
