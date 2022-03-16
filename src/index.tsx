import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppRoutes } from './routes';

import './styles/global.css';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AppRoutes />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
