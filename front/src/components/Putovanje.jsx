import { useEffect, useState } from 'react';
import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import PageHeader from './pageHeader/PageHeader';
import APIService from '../APIService';

const Putovanje = () => {
  const KorisnikUsername = localStorage.getItem('username');
  const userID = localStorage.getItem('id');
  const PutovanjeID = localStorage.getItem('putovanje');
  console.info(PutovanjeID);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [putovanjee, setPutovanje] = useState({});
  const [korisnik, setKorisnikID] = useState(parseInt(userID));
  const [putovanje, setIdPutovanja] = useState(parseInt(PutovanjeID));

  let history = useNavigate();

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/putovanja/${PutovanjeID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setPutovanje(resp))
      .catch((err) => console.log(err));
  }, []);

  console.info(putovanjee);
  const prijaviSe = () => {
    APIService.prijaviSeNaPutovanje({ korisnik, putovanje })
      .then((resp) => {
        //console.log(resp);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <PageHeader />
      <div className='paddajMalo1'>
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
            <Typography variant='h6'>{putovanjee.naziv}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              Opis : {putovanjee.opis}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              Datum polaska: {putovanjee.datum}
            </Typography>
            <Typography variant='subtitle1'>
              Datum vracanja: {putovanjee.datum_zavrsetka}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              Prevoz : {putovanjee.prevoz}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1'>Tip : {putovanjee.tip}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              Cijena: {putovanjee.cijena} KM
            </Typography>
          </Grid>
          {/* Ne mozemo se prijaviti ako je zavrseno putovanje */}
          {new Date(putovanjee.datum).getTime() - new Date().getTime() > 0 && (
            <Grid item xs={12}>
              <Typography
                variant='subtitle1'
                style={{ color: 'black', textDecoration: 'none' }}
              >
                <Button
                  onClick={prijaviSe}
                  variant='contained'
                  className='app-bar-button'
                >
                  Prijavi se
                </Button>
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Putovanje;
