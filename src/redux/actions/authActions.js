import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_ERROR } from '../types.js';

export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/register', formData);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });
  }
};

export const login = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/login', formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};