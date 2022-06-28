import React from 'react';
import { useState } from 'react';
import ResponsiveAppBar from '../components/pageHeader/PageHeader';
import { Typography, Grid, Button } from '@mui/material';

const Student = () => {
  const [faks, setFaks] = useState(false);
  return (
    <div>
      <ResponsiveAppBar />
      <div className='paddajMalo1'>
        <Grid
          container
          spacing={20}
          sx={{
            fontSize: '1.1rem',
            padding: '4rem',
          }}
        >
          <Grid item xs={7}>
            <Typography variant='inherit'>
              Zovem se Nadir Dulić i autor sam ovog projekta.
            </Typography>
            <Typography variant='inherit'>
              Studiram na Prirodno-matematičkom fakultetu u Sarajevu i student
              sam druge godine IT smjera.{' '}
            </Typography>
            <Typography variant='inherit'>
              Projekat je rađen za predmet Web programiranje 2, te je za backend
              korišten Django, a za frontend React.
            </Typography>
            <Typography variant='inherit'>
              Pored programiranja, volim se baviti sportom i kuhanjem.
            </Typography>
            <Button
              variant='contained'
              className='app-bar-button'
              style={{
                marginTop: '2rem',
              }}
              onClick={() => setFaks(!faks)}
            >
              {' '}
              {faks ? 'Sakrij o predmetu' : 'Prikaži o predmetu'}{' '}
            </Button>
            {faks && (
              <div>
                <Typography variant='inherit' sx={{ marginTop: '2rem' }}>
                  Ciljevi predmeta su upoznavanje sa izradom dinamickih web
                  sistema kroz skriptne jezike kao i veza sa bazama podataka.
                  Poznavanje klijent - server tehnologija. Pored toga, studenti
                  se upoznaju sa metodologijom rješavanja problema u izradi
                  dinamičkog web sajta.
                </Typography>
                <Typography variant='inherit' sx={{ marginTop: '2rem' }}>
                  Predmetni profesor je Prof. dr. Adis Alihodžić, a asistentica
                  mr. Eldina Delalić
                </Typography>
              </div>
            )}
          </Grid>

          <Grid item xs={5}>
            <img
              alt='Nadir'
              src={process.env.PUBLIC_URL + '/images/Nadir.jpg'}
              className='nadirslika'
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Student;
