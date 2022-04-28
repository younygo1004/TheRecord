import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import '../styles/common/app.css';

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
