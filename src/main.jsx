//Setting up React Router

import React from 'react';
import {createRoot} from "react-dom/client.js"; //new
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);