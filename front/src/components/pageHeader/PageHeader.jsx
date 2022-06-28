import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCookies } from 'react-cookie';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import './PageHeader.css';

import { Link } from 'react-router-dom';
import CustomizedSwitches from '../Switch';

const ResponsiveAppBar = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [terraraDropdown, setTerraraDropdown] = React.useState(null);
  const [arrow, setArrow] = React.useState(null);
  let history = useNavigate();

  React.useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);
  const logoutBtn = () => {
    removeToken(['mytoken']);
    localStorage.removeItem('id');
  };
  const showArrow = (arrowValue) => {
    if (arrowValue == 'Up') {
      return <MdKeyboardArrowUp />;
    } else {
      return <MdKeyboardArrowDown />;
    }
  };

  const handleOpenTerraraMenu = (event) => {
    setTerraraDropdown(event.currentTarget);
    setArrow('Up');
  };
  const handleCloseTerraraMenu = () => {
    setTerraraDropdown(null);
    setArrow('Down');
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='sticky' color='transparent'>
      <Container maxWidth='xl' className='app-bar-color'>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            <Typography textAlign='center'>
              <Link to={'/home'}>
                <img
                  alt='Terrera Logo'
                  src={process.env.PUBLIC_URL + '/images/AgencijaSlika.jpg'}
                  className='app-bar-logo'
                  width='50px'
                />
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: 'none', md: 'flex' },
              marginRight: '12.3%',
            }}
          >
            <Link
              to={'/profil'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                className='app-bar-button'
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                Profil{' '}
              </Button>
            </Link>

            <Link
              to={'/agencije'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                className='app-bar-button'
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                Agencije{' '}
              </Button>
            </Link>

            <Link
              to={'/putovanja'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                className='app-bar-button'
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                Putovanja{' '}
              </Button>
            </Link>

            <Button
              className='app-bar-button'
              onClick={logoutBtn}
              onMouseOver={handleOpenTerraraMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'capitalize',
              }}
            >
              Logout
            </Button>

            <Link
              to={'/student'}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Button
                className='app-bar-button'
                onMouseOver={handleOpenTerraraMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'capitalize',
                }}
              >
                Student{' '}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
