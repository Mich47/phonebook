import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',

  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.data.token;
    if (token === null) {
      return thunkAPI.rejectWithValue('Error authorization');
    }
    try {
      setAuthHeader(token);
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const postContact = createAsyncThunk(
  'contacts/postContact',
  async ({ name, number: phone }, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', { name, phone });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchContact = createAsyncThunk(
  'contacts/patchContact',
  async ({ id, name, number: phone }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${id}`, {
        name,
        phone,
      });
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
