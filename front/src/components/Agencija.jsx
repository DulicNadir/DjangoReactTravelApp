import { useEffect, useState } from 'react';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import PageHeader from './pageHeader/PageHeader';

const Agencija = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [agencija, setAgencija] = useState({});
  let history = useNavigate();
  const KorisnikUsername = localStorage.getItem('username');

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  const AgencijaID = localStorage.getItem('agencija');
  //console.info(AgencijaID);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/agencija/${AgencijaID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setAgencija(resp))
      .catch((err) => console.log(err));
  }, []);

  console.info(agencija);

  return (
    <div>
      <PageHeader />
      <div className='paddajMalo'>
        {
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                Ime agencije: {agencija.agencyname}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                Email: {agencija.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle1'>
                Telefon: {agencija.phnumber}
              </Typography>
            </Grid>
          </Grid>
        }
      </div>
    </div>
  );
};

export default Agencija;
