import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/pageHeader/PageHeader';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import APIService from '../APIService';
import { borderRadius } from '@mui/system';

const Putovanja = () => {
  const [putovanja, setPutovanja] = useState([]);
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [naziv, setNaziv] = useState('');
  const [tip, setTip] = useState('');
  const [opis, setOpis] = useState('');
  const [agencije, setAgencije] = useState([]);

  const [agencija, setAgencija] = useState(1);
  const [datum, setDatum] = useState(new Date());
  const [datum_zavrsetka, setDatumZavrsetka] = useState(new Date());

  const [prevoz, setPrevoz] = useState('');
  const [cijena, setCijena] = useState(0);
  const [maxbroj, setMaxBroj] = useState(20);

  const [unos, setUnos] = useState(false);

  let history = useNavigate();

  const prijaviSe = () => {
    APIService.dodajPutovanje({
      datum,
      datum_zavrsetka,
      tip,
      naziv,
      opis,
      agencija,
      prevoz,
      maxbroj,
      cijena,
    })
      .then((resp) => {
        //console.log(resp);
      })
      .catch((error) => console.log(error));
  };

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
      .catch((err) => console.log(err));
  }, []);
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
  console.log(agencije);

  //console.log(putovanja);

  return (
    <div>
      <ResponsiveAppBar />

      <div className='paddajMalo1'>
        <Grid container spacing={80}>
          <Grid item xs={6}>
            <Typography
              variant='h4'
              sx={{
                padding: '2rem',
              }}
            >
              {' '}
              Sva putovanja{' '}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant='contained'
              className='app-bar-button'
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                textTransform: 'capitalize',
              }}
            >
              <Link
                to={'/mojaputovanja'}
                style={{ color: 'white', textDecoration: 'none' }}
              >
                Moja putovanja{' '}
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          {putovanja.map((putovanje) => {
            const postaviID = () => {
              localStorage.setItem('putovanje', putovanje.id);
            };
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
                    <Typography variant='h6'>{putovanje.naziv}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      Datum : {putovanje.datum}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      Cijena : {putovanje.cijena} KM
                    </Typography>
                  </Grid>

                  {
                    <Grid item xs={12}>
                      <Link to={'/putovanje'} className='dekoracija'>
                        <Button
                          variant='contained'
                          onClick={() => postaviID()}
                          className='app-bar-button'
                        >
                          <Typography
                            style={{ color: 'white', textDecoration: 'none' }}
                          >
                            {' '}
                            Pogledaj putovanje
                          </Typography>
                        </Button>
                      </Link>
                    </Grid>
                  }
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
            <Typography>Unesi putovanje </Typography>
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
              value={naziv}
              onChange={(e) => setNaziv(e.target.value)}
            ></input>
          </Grid>
          <Grid item xs={4}>
            {' '}
            <Typography>Opis: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={opis}
              onChange={(e) => setOpis(e.target.value)}
            ></input>
          </Grid>
          <Grid item xs={4}>
            <Typography>Tip: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={tip}
              onChange={(e) => setTip(e.target.value)}
            ></input>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Prevoz: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={prevoz}
              onChange={(e) => setPrevoz(e.target.value)}
            ></input>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Max broj: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={maxbroj}
              onChange={(e) => setMaxBroj(e.target.value)}
            ></input>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Cijena: </Typography>
            <input
              className='inputstyle'
              type='text'
              value={cijena}
              onChange={(e) => setCijena(e.target.value)}
            ></input>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Agencija: </Typography>
            <select
              className='inputstyle'
              style={{
                width: '12.8rem',
              }}
            >
              {agencije.map((agencija) => {
                return (
                  <option value={agencija.id} key={agencija.id}>
                    {agencija.agencyname}
                  </option>
                );
              })}
            </select>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Datum: </Typography>
            <input
              className='inputstyle'
              style={{
                width: '10rem',
              }}
              type='date'
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            ></input>{' '}
          </Grid>
          <Grid item xs={4}>
            <Typography>Datum završetka: </Typography>
            <input
              className='inputstyle'
              style={{
                width: '10rem',
              }}
              type='date'
              value={datum_zavrsetka}
              onChange={(e) => setDatumZavrsetka(e.target.value)}
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
              Dodaj putovanje
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Putovanja;
