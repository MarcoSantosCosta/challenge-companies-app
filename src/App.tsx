import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navBar';

import { ptBR as corePtBR } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR as dataGridPtBR } from '@mui/x-data-grid';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  dataGridPtBR, // x-data-grid translations
  corePtBR // core translations
);

const App: React.FC = () => {
  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <NavBar />
          <Outlet />
          <ToastContainer />
        </ThemeProvider>
      </LocalizationProvider>
    </React.Fragment>
  );
};
export default App;
