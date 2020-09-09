import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/index';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/index'
import {Provider } from 'react-redux'
import './common/css/font.css'
import fastclick from 'fastclick';

fastclick.attach(document.body);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();
