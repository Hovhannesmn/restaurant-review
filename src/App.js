import React, { Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './App.css';
import * as actions from './store/actions';
import { connect } from 'react-redux';
import useMount from './utils/useMount';
import { usersList } from './defines';

const SignIn = React.lazy(() => {
  return import('./containers/Auth/SignIn');
});

const SignUp = React.lazy(() => {
  return import('./containers/Auth/SignUp');
});

const Home = React.lazy(() => {
  return import('./containers/Home');
});

const App = props => {
  useMount(() => {
    props.initData(usersList);
  });

  let routes = (
    <Switch>
      <Route path="/sign-in" render={props => <SignIn {...props} />} />
      <Route path="/sign-up" render={props => <SignUp {...props} />} />
      <Redirect to="/sign-in"/>
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/home" render={props => <Home {...props} />} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initData: () => dispatch(actions.initData(usersList))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
