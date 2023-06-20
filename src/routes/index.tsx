import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateCompany from '../components/forms/createCompany';
import CreateSupplier from '../components/forms/createSupplier';
import CompanyDetails from '../pages/companies/companiesDetails';
import ListCompanies from '../pages/companies/listCompanies';
import ListSupplier from '../pages/companies/listSuppliers';
import Home from '../pages/home';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
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
