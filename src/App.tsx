import Home from './pages/home';
import Companies from './pages/companies';
import Suppliers from './pages/suppliers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/company" Component={Companies} />
        <Route path="/supplier" Component={Suppliers} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
