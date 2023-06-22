import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateCompany from '../components/company/createCompany';
import CreateSupplier from '../components/forms/createSupplier';
import CompanyDetails from '../pages/companies/companiesDetails';

import ListSupplier from '../pages/suppliers/listSuppliers';
import Home from '../pages/home';
import ListCompanies from '../components/company/listCompanies';
import UpadateCompany from '../components/company/updateCompany';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Navigate to="/company" />,
      },
      {
        path: '/company',
        element: <ListCompanies />,
      },
      {
        path: '/company/:id',
        element: <CompanyDetails />,
      },
      {
        path: '/company/add',
        element: <CreateCompany />,
      },
      {
        path: '/company/:id/edit',
        element: <UpadateCompany />,
      },
      {
        path: 'supplier',
        element: <ListSupplier />,
      },
      {
        path: 'supplier/add',
        element: <CreateSupplier />,
      },
    ],
  },
]);
