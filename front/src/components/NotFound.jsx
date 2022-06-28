import { Box, Typography, Container, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/pageHeader/PageHeader';
const NotFound = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Container style={{ textAlign: 'center' }}>
        <Grid container spacing={2} padding={6}>
          <Grid item xs={12}>
            <Typography variant='h1' fontSize={150}>
              404
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='p' color='black' fontSize={30}>
              Page not found
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to={'/'}>
              <button className='notFoundHome'>
                <Typography variant='p' color='black'>
                  Home
                </Typography>
              </button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default NotFound;
