import axios from '../../axiosConfig.js';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR
} from '../types.js';

export const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data
});

export const registerFail = (errors) => ({
  type: REGISTER_FAIL,
  payload: errors
});

export const authError = (message) => ({
  type: AUTH_ERROR,
  payload: message
});

export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/users', formData);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    const errorMsg = error.response && error.response.data ? error.response.data.errors : [{ msg: 'Registration failed' }];
    dispatch(registerFail(errorMsg));
    dispatch(authError('Registration failed: ' + (error.message || 'Unknown error')));
  }
};

export const login = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData);
    localStorage.setItem('authToken', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    const errorMsg = error.response && error.response.data ? error.response.data.errors : [{ msg: 'Login failed' }];
    dispatch({ type: LOGIN_FAIL, payload: errorMsg });
    dispatch(authError('Login failed: ' + (error.message || 'Unknown error')));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('authToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: LOGOUT });
};
