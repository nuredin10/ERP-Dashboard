import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
import Router from 'next/router'
import authAxios from '../components/authAxios'
import logo from '../../public/logo.svg'
import CustomAlert from 'src/components/alert';
import axios from 'axios';
// import Alert from '@Mui/material/Alert';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Proplast
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const [incorrect, setIncorrect] = React.useState(false)
  const [alertS, setAlertS] = useState(false)
  const alertComponent = (<Alert severity='error'>Incorrect Username or Password</Alert>);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
    authAxios.post('/login', {
    // axios.post('http://localhost:42000/test', {
      email: data.get('email'),
      password: data.get('password'),
    })
      .then((res) => {
        console.log(res)
        Cookies.set('token', res.data.jwt)
        Cookies.set("loggedIn", true)
        Router.push('/dashboard')
        // console.log(res)
        // jwt.verify(token,'PROPLAST', (err, decoded) =>{
        //   if (err) {
        //     console.log(err)
        //   } else {
        //     console.log(decoded)
        //   }
        // })
      })
      .catch((res) => {
        console.log(res)
        // setIncorrect(true)
        if (res.response.status == 401) {
          // setIncorrect(true)
          console.log('Incorrect');
          // <Alert severity="error">This is an error alert — check it out!</Alert>
          setAlertS(true);

        }
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: 'url(/proplast-side-image.jpg)',
            backgroundRepeat: 'no-repeat',
            // border: '1px solid red',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ width: 100, height: 100 }} src='logo.svg'>
            </Avatar> */}
            <div className='py-6'>
              <img
                className='w-60'
                src="logo2.svg" alt="Proplast Logo" />
            </div>
            {/* <Box
              component="img"
              sx={{
                height: 100,
                width: 100
              }}
              alt="Proplast Logo"
              src="logo.svg"
            /> */}

            {/* <div> */}
            {/* <img src='logo.svg' alt="Proplast logo" /> */}
            {/* </div> */}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                color='primary'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 50 }}
              >
                Sign In
              </Button>
              <Grid>
                {incorrect && <Typography color='error'>Incorrect email or password</Typography>}

              </Grid>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}