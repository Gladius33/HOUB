import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosConfig.js';
import { getCookie } from 'cookies-next';

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie('authToken');
      const res = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = getCookie('authToken');
      const res = await axios.put('/api/users/:userId', JSON.stringify(profileData), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const updatePaymentInfo = createAsyncThunk(
  'profile/updatePaymentInfo',
  async (paymentInfo, { rejectWithValue }) => {
    try {
      const token = getCookie('authToken');
      const res = await axios.put('/api/users/payment-info', paymentInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updatePaymentInfo.fulfilled, (state, action) => {
        state.profile = { ...state.profile, paymentInfo: action.payload };
        state.loading = false;
      })
      .addCase(updatePaymentInfo.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;

