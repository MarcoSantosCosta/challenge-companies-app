import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navItems = [
    {
      name: 'Empresas',
      path: 'company',
    },
    {
      name: 'Fornecedores',
      path: 'supplier',
    },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Challenge Companies
        </Typography>
        {navItems ? (
          navItems.map((item: any) => {
            return (
              <Button color="inherit" component={Link} to={item.path} key={item.path}>
                {item.name}
              </Button>
            );
          })
        ) : (
          <Typography variant="body1">No items</Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
