import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/pageHeader/PageHeader';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [putovanja, setPutovanja] = useState([]);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [loaded, setIsLoaded] = useState(false);
  let history = useNavigate();

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  var numDaysBetween = function (d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/putovanja/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPutovanja(resp))
      .then(() => setIsLoaded(true))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        variant='contained'
        onClick={handleClick}
        className='app-bar-button'
      >
        Zavrsena putovanja
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {putovanja.map((putovanje) => {
          const postaviID = () => {
            localStorage.setItem('putovanje', putovanje.id);
          };

          if (
            new Date(putovanje.datum_zavrsetka).getTime() -
              new Date().getTime() <
            0
          ) {
            return (
              <Link to='/putovanje' key={putovanje.id} className='dekoracija'>
                <MenuItem onClick={postaviID}>{putovanje.naziv}</MenuItem>
              </Link>
            );
          }
        })}
      </Menu>
    </div>
  );
}
