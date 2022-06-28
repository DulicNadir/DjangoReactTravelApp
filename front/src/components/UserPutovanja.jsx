import { useEffect, useState } from 'react';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import PageHeader from './pageHeader/PageHeader';

const UserPutovanja = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [putovanja, setPutovanje] = useState([{}]);
  const [isLoading, setIsLoading] = useState(false);
  let history = useNavigate();
  const userId = localStorage.getItem('id');

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/putkorisnik/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPutovanje(resp))
      .then(() => setIsLoading(true))
      .catch((err) => console.log(err));
  }, []);

  console.info(putovanja);

  if (!isLoading) {
    return (
      <div>
        <PageHeader />
        <h2>Loading..</h2>
      </div>
    );
  } else {
    return (
      <div>
        <PageHeader />
        {putovanja.map((putovanje) => {
          return (
            <div key={putovanje.id} className='paddajMalo'>
              <Grid
                container
                spacing={1}
                sx={{
                  padding: '2rem',
                }}
                className='kartica'
                width='70%'
                margin='auto'
              >
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Naziv: {putovanje.putovanje.naziv}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Agencija: {putovanje.putovanje.agencija.agencyname}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Opis putovanja: {putovanje.putovanje.opis}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Datum: {putovanje.putovanje.datum}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Prevoz: {putovanje.putovanje.prevoz}{' '}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    Cijena: {putovanje.putovanje.cijena} KM{' '}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </div>
    );
  }
};

export default UserPutovanja;
