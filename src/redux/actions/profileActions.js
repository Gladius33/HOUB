import axios from '../../axiosConfig.js';
import { UPDATE_PROFILE, GET_PROFILE, AUTH_ERROR } from '../types.js';

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const updateProfile = (profileData) => async dispatch => {
  const token = localStorage.getItem('authToken');
  setAuthToken(token);

  try {
    const res = await axios.put(`/api/users/${profileData.userId}`, profileData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getProfile = () => async dispatch => {
  const token = localStorage.getItem('authToken');
  setAuthToken(token);

  try {
    const res = await axios.get('/api/auth/profile');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
