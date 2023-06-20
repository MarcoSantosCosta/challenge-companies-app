/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';

const NavBar: React.FC = () => {
  const navItems = routes.routes[0].children;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Challenge Companies
        </Typography>
        {navItems ? (
          navItems.map((item: any) => {
            return (
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                // eslint-disable-next-line prettier/prettier
                key={item.path}
              >
                {item.path === '/' ? 'Home' : item.path.substr(1).toUpperCase()}{' '}
              </Button>
            );
          })
        ) : (
          <Typography variant="body1">No items</Typography>
        )}
        ;
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
