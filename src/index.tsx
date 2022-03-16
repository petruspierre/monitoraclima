import React from 'react';
import ReactDOM from 'react-dom';

import { AppRoutes } from './routes';

import './styles/global.css';

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);
