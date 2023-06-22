import React from 'react';
import './index.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
