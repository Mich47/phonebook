import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

// axios.defaults.baseURL = 'https://nodejs-contacts-api.onrender.com/api';
axios.defaults.baseURL = 'http://localhost:4000/api';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const signupUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/register', credentials);

      console.log('data/register ', data);

      // setAuthHeader(data.token);
      return data;
    } catch (error) {
      const rejectMessage = error.response.data.message || error.message;

      return thunkAPI.rejectWithValue(rejectMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.data.token;
    if (token === null) {
      return thunkAPI.rejectWithValue('Error authorization');
    }
    try {
      setAuthHeader(token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.data.token;
    if (token === null) {
      return thunkAPI.rejectWithValue('Error authorization');
    }
    try {
      setAuthHeader(token);
      const { data } = await axios.post('/users/logout');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
