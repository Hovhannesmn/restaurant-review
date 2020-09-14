import * as actionTypes from './actionTypes';
import { usersList } from '../../defines';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = userId => {
  return {
    userId,
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const user = usersList.find(({ email: e, password: p }) => e === email && password === p);
    debugger;
    if (user) {
      localStorage.setItem('userId', user.userId);
      dispatch(authSuccess(user.userId));
    } else {
      dispatch(authFail('wrong email or password'));
    }
  };
};

export const signUp = (firstName, lastName, email, password) => {
  return dispatch => {
    dispatch(authStart());

    if (!usersList.find(({ email: e }) => e === email)) {
      const userId = usersList.length + 1;
      const user = { firstName, lastName, email, password, userId };

      dispatch(authSuccess(user.userId));
      localStorage.setItem('userId', user.userId);
      usersList.push(user);
      localStorage.setItem('users', JSON.stringify(usersList));
    } else {
      dispatch(authFail('the user with this email is exists'));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    path,
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
  };
};

export const initData = (usersList) => {
  return dispatch => {
    const userId = localStorage.getItem('userId');
    usersList = JSON.parse(localStorage.getItem('users')) || [];
    !userId ? dispatch(logout()) : dispatch(authSuccess(userId));
  };
};
