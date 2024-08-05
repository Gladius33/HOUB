import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosConfig.js';
import { setCookie, removeCookie, getCookie } from 'cookies-next';

export const register = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCookie('authToken', res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/auth/login', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setCookie('authToken', res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  removeCookie('authToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;