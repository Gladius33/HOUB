import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducers.js';
import profileReducer from './reducers/profileReducers.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;
