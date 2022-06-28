import React from 'react';
import { useState, useEffect } from 'react';
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [token, setToken] = useCookies(['mytoken']);
  const [isLogin, setIsLogin] = useState(true);
  let history = useNavigate();

  useEffect(() => {
    if (token['mytoken'] == 'undefined') {
      history('/');
    } else if (token['mytoken']) {
      history('/profil');
    }
  }, [token]);

  const LoginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => {
        localStorage.setItem('username', username);
        setToken('mytoken', resp.token);
        //console.log(resp.token);
      })
      .catch((error) => console.log(error));
  };
  const RegisterBtn = () => {
    APIService.RegisterUser({ username, password, first_name, last_name }).then(
      (resp) => {
        localStorage.setItem('username', username);
        LoginBtn();
      }
    );
  };
  return (
    <div className='loginregcitava'>
      <div className='loginStranica'>
        {isLogin ? (
          <Grid container spacing={2}>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='h3'>LOG IN</Typography>
              <br></br>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='h3'>REGISTER</Typography>
              <br></br>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        )}

        {!isLogin ? (
          <Grid container spacing={2}>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='body1'>Username</Typography>
              <input
                className='input'
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item sm={4}></Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='body1'>Password</Typography>
              <input
                className='input'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='body1'>First name</Typography>
              <input
                className='input'
                type='text'
                id='firstname'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              <Typography variant='body1'>Last name</Typography>
              <input
                className='input'
                type='text'
                id='lastname'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4}></Grid>
            <Grid item sm={4} className='logregforma'>
              {isLogin ? (
                <Grid container spacing={2}>
                  <Grid item sm={4}></Grid>
                  <Grid item sm={4} className='logregforma'>
                    <button onClick={LoginBtn} className='dugme'>
                      Login
                    </button>
                  </Grid>
                  <Grid item sm={4}></Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item sm={4}></Grid>
                  <Grid item sm={4} className='logregforma'>
                    <button onClick={RegisterBtn} className='dugme'>
                      Register
                    </button>
                    <br></br>
                    <br></br>
                  </Grid>
                  <Grid item sm={4}></Grid>
                </Grid>
              )}
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className='logregforma'>
              <Typography variant='body1'>Username</Typography>

              <input
                className='input'
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className='logregforma'>
              <br></br>
              <br></br>
              <Typography variant='body1'>Password</Typography>
              <input
                className='input'
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className='logregforma'>
              <button onClick={LoginBtn} className='dugme'>
                Login
              </button>
              <br></br>
              <br></br>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        )}

        {isLogin ? (
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className='logregforma'>
              <Typography>
                Ako nemate racun,{' '}
                <button onClick={() => setIsLogin(false)} className='dugme'>
                  Registrujte se
                </button>
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} className='logregforma'>
              <Typography>
                Ako imate racun,{' '}
                <button onClick={() => setIsLogin(true)} className='dugme'>
                  Logujte se
                </button>
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Login;
