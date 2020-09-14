import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  useHistory,
} from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import getStyles from '../getStyles';
import { Controller, useForm } from 'react-hook-form';
import * as actions from '../../../store/actions';

import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

import '../index.css'

const schema = yup.object().shape({
  email: yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Must be valid email'),
  firstName: yup.string().matches(/^(?!-)(?!.*--)[^0-9\[\]\\`~!@#$%^&*()_+={};:<>|.\/?,"']+$/i, 'invalid password'),
});

const SignIn = props => {
  const classes = getStyles();
  const history = useHistory();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    props.error && alert(props.error);
  }, [props.error]);

  props.isAuthenticated && history.push('/home');

  const { handleSubmit, control, reset, errors, register } = methods;

  const onSubmit = ({ email, password }) => {
    props.onAuth(email, password);
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
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            {errors.email && <p className="error-text">{errors.email.message}</p>}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              ref={
                register({required: true, maxLength: 3})
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
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item>
              <Link to="sign-up">Don\'t have an account? Sign Up</Link>
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
    isAuthenticated: state.auth.userId !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.signIn(email, password, isSignup)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
