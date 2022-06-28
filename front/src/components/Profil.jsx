import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import APIService from '../APIService';
import { Typography } from '@mui/material';
import PageHeader from './pageHeader/PageHeader';

const Profil = () => {
  const [token, setToken, removeToken] = useCookies(['mytoken']);
  const [users, setUsers] = useState([]);
  const [Edit, setEdit] = useState(false);

  let history = useNavigate();
  const KorisnikUsername = localStorage.getItem('username');

  useEffect(() => {
    if (!token['mytoken'] | (token['mytoken'] == 'undefined')) {
      history('/');
    }
  }, [token]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token['mytoken']}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setUsers(resp))
      .catch((err) => console.log(err));
  }, []);
  console.log(users);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const updateUser = () => {
    APIService.updateUser(
      Ja.id,
      { username, password, first_name, last_name },
      token['mytoken']
    );
  };
  const Ja = users.find((user) => {
    if (user.username == KorisnikUsername) {
      localStorage.setItem('id', user.id);
      return user.username == KorisnikUsername;
    }
  });
  return (
    <div>
      <PageHeader />
      <div className='paddajMalo'>
        {Ja && (
          <Grid container spacing={3} textAlign='center'>
            <Grid item xs={12}>
              <Typography variant='h6'>Zdravo, {Ja.username}</Typography>
              <Typography variant='subtitle1'>
                Dobro došli na Vaš profil
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <Typography variant='h5'>Ime: {Ja.first_name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h5'>Prezime: {Ja.last_name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' onClick={() => setEdit(!Edit)}>
                {Edit ? 'Zatvori' : 'Uredi'}
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
      <div className='paddajMalo'>
        {Edit && (
          <Grid container spacing={2} textAlign='center'>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              {' '}
              <label htmlFor='username'>Username: </label>
              <br></br>
              <input
                width='100%'
                type='text'
                id='username'
                value={username}
                placeholder={Ja.username}
                onChange={(e) => setUsername(e.target.value)}
                className='inputstyle'
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              {' '}
              <label htmlFor='firstname'>Ime: </label> <br></br>
              <input
                className='inputstyle'
                type='text'
                placeholder={Ja.first_name}
                value={first_name}
                id='firstname'
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              {' '}
              <label htmlFor='lastname'>Prezime: </label> <br></br>
              <input
                className='inputstyle'
                type='text'
                value={last_name}
                placeholder={Ja.last_name}
                id='lastname'
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              {' '}
              <label htmlFor='password'>Password: </label> <br></br>
              <input
                className='inputstyle'
                type='password'
                value={password}
                id='lastname'
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>

            <Grid item xs={4}>
              <Button variant='contained' onClick={updateUser}>
                Edit user
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Profil;
