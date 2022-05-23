import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  /* Strict mode adds additional checks and warnings */
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  document.getElementById('root')
);