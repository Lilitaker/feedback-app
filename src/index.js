import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot (document.getElementById('root'));
  
root.render (
  /* Strict mode adds additional checks and warnings */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);