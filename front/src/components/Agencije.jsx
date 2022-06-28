import { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import PageHeader from './pageHeader/PageHeader';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import APIService from '../APIService';

const Agencije = () => {
  const [agencije, setAgencije] = useState([]);
  const [agencyname, setAgencyName] = useState('');
  const [email, setEmail] = useState('');
  const [phnumber, setPhnumber] = useState('');
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [unos, setUnos] = useState(false);

  let history = useNavigate();

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/agencija/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setAgencije(resp))
      .catch((err) => console.log(err));
  }, []);

  const prijaviSe = () => {
    APIService.dodajAgenciju({
      agencyname,
      email,
      phnumber,
    })
      .then((resp) => {
        //console.log(resp);
      })
      .catch((error) => console.log(error));
  };

  console.log(agencije);

  return (
    <div>
      <PageHeader />

      <div className='paddajMalo'>
        <Typography
          variant='h6'
          sx={{
            padding: '2rem',
          }}
        >
          {' '}
          Pogledaj sve agencije:
        </Typography>
        <Grid container spacing={6}>
          {agencije.map((agencija) => {
            const postaviID = () => {
              localStorage.setItem('agencija', agencija.id);
            };
            return (
              <Grid item xs={12} md={4} xl={3} key={agencija.id}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    padding: '2rem',
                  }}
                  className='kartica'
                >
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      AGENCIJA {agencija.agencyname}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      {agencija.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Link to={`/agencija`} className='dekoracija'>
                      <Button
                        variant='contained'
                        onClick={() => postaviID()}
                        className='app-bar-button'
                      >
                        Posjeti agenciju
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <br></br>
      <hr className='horizLine'></hr>
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        {' '}
        <Button
          onClick={() => setUnos(!unos)}
          className='app-bar-button'
          style={{ color: 'white', textDecoration: 'none' }}
        >
          {!unos ? (
            <Typography>Unesi agenciju </Typography>
          ) : (
            <Typography>Zavrsi unos</Typography>
          )}
        </Button>
      </div>

      {unos && (
        <Grid
          container
          spacing={1}
          textAlign='center'
          sx={{
            border: '1px solid black',
            width: '80%',
            margin: 'auto',
            padding: '2rem',
            marginBottom: '2rem',
            borderRadius: '2rem',
            backgroundColor: 'rgb(37, 77, 117)',
            color: 'white',
          }}
        >
          <Grid item xs={4}>
            <Typography>Naziv: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={agencyname}
              onChange={(e) => setAgencyName(e.target.value)}
            ></input>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Typography>Email: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </Grid>
          <Grid item xs={4}>
            <Typography>Broj telefona: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={phnumber}
              onChange={(e) => setPhnumber(e.target.value)}
            ></input>{' '}
          </Grid>

          <Grid item xs={12} marginTop='2rem'>
            <Button
              onClick={prijaviSe}
              variant='contained'
              className='app-bar-button'
              style={{
                marginBottom: '2rem',
              }}
            >
              Dodaj agenciju
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Agencije;
