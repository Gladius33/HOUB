import axios from 'axios';
import { UPDATE_PROFILE, GET_PROFILE, AUTH_ERROR } from '../types.js';

export const updateProfile = (profileData) => async dispatch => {
  try {
    const res = await axios.put('/api/profile', profileData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};
