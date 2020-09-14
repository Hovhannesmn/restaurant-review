import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import getStyles from '../getStyles';
import * as actions from '../../../store/actions';


const schema = yup.object().shape({
  email: yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must be valid email'),
  password: yup.string().matches(/^(?!-)(?!.*--)[^0-9\[\]\\`~!@#$%^&*()_+={};:<>|.\/?,"']+$/i, 'invalid password'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

const SignUp = props => {
  const classes = getStyles();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSubmit, control, reset, errors, register } = methods;


  const onSubmit = ({ firstName, lastName, email, password }) => {
    props.onSignUp(firstName, lastName, email, password);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline/>
      <Grid item xs={false} sm={4} md={7} className={classes.image}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="first name"
                  name="firstName"
                  autoComplete="first name"
                  autoFocus
                />
              }
            />
            {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="lastName"
                  label="last name"
                  name="lastName"
                  autoComplete="last name"
                  autoFocus
                />
              }
            />
            {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              }
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              ref={
                register({ required: true, maxLength: 3 })
              }
              as={
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              }
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={Object.keys(errors).length}
            >
              Register
            </Button>
          </form>
          <Grid container>
            <Grid item>
              <Link to="sign-in">Sign in</Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (firstName, lastName, email, password) => dispatch(actions.signUp(firstName, lastName, email, password)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
