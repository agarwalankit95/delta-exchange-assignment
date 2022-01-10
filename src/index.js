import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './components/App.js';
import './styles.css';

const appRoute = (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(appRoute, document.getElementById('root'));