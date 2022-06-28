import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/pageHeader/PageHeader';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import BasicMenu from './DropdownMenu';

const Home = () => {
  const [putovanja, setPutovanja] = useState([]);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [loaded, setIsLoaded] = useState(false);
  let history = useNavigate();

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

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

  // if (loaded) {
  //   const datumPutovanja = new Date(putovanja[0].datum);
  //   console.log(numDaysBetween(new Date(), datumPutovanja));
  // }
  if (loaded) {
    return (
      <div>
        <ResponsiveAppBar />
        <Toolbar />
        <div className='paddajMalo1'>
          <Typography variant='h6'>
            Pogledaj putovanja u posljednjih mjesec dana:
          </Typography>
        </div>

        <div className='paddajMalo1'>
          <Grid container spacing={6}>
            {putovanja.map((putovanje) => {
              const postaviID = () => {
                localStorage.setItem('putovanje', putovanje.id);
              };

              // console.log(
              //   new Date(putovanje.datum) >
              //     new Date().setDate(new Date().getDate() - 31) &&
              //     new Date(putovanje.datum) < new Date()
              // );

              if (
                new Date(putovanje.datum) >
                  new Date().setDate(new Date().getDate() - 31) &&
                new Date(putovanje.datum) < new Date()
              ) {
                return (
                  <Grid item xs={12} md={4} xl={3} key={putovanje.id}>
                    <Grid
                      container
                      spacing={1}
                      sx={{
                        padding: '2rem',
                      }}
                      className='kartica'
                    >
                      <Grid item xs={12}>
                        {' '}
                        <Typography variant='h6'>{putovanje.naziv}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {' '}
                        <Typography variant='body1'>
                          {putovanje.opis}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {' '}
                        <Typography variant='body1'>
                          Prevoz: {putovanje.prevoz}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Link to={'/putovanje'} className='dekoracija'>
                          <Button
                            variant='contained'
                            onClick={() => postaviID()}
                            className='app-bar-button'
                          >
                            <Typography
                              style={{
                                color: 'white',
                                textDecoration: 'none',
                                float: 'bottom',
                              }}
                            >
                              {' '}
                              Pogledaj putovanje
                            </Typography>
                          </Button>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })}
          </Grid>
        </div>
        <hr></hr>
        <div className='paddajMalo1'>
          <Typography variant='h6'>Pogledaj završena putovanja:</Typography>
          <br></br>
          <BasicMenu />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ResponsiveAppBar />
        Loading..
      </div>
    );
  }
};

export default Home;
