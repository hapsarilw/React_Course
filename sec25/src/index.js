import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import configureProductsStore from './hooks-store/products-store';
// Set up store
configureProductsStore();

ReactDOM.render( 
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);
