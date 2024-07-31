import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR
} from '../types.js';

export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/user', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Registration Error:', error);
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response && error.response.data ? error.response.data.errors : [{ msg: 'Registration failed' }]
    });
    dispatch({
      type: AUTH_ERROR,
      payload: 'Registration failed: ' + (error.message || 'Unknown error')
    });
  }
};

export const login = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth', formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    console.error('Login Error:', error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data ? error.response.data.errors : [{ msg: 'Login failed' }]
    });
    dispatch({
      type: AUTH_ERROR,
      payload: 'Login failed: ' + (error.message || 'Unknown error')
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
