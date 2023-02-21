import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  refreshUser,
  signupUser,
} from './auth.operations';
import { STATUS } from 'constants/status.constants';

const initialState = {
  status: STATUS.idle,
  data: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signupUser.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.data = payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, { payload }) => {
        state.status = STATUS.error;
        state.error = payload;
      })
      .addCase(loginUser.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.error = null;
        state.data = payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = STATUS.error;
        state.error = payload;
      })
      .addCase(refreshUser.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.error = null;
      })
      .addCase(refreshUser.rejected, () => initialState)
      .addCase(logoutUser.pending, state => {
        state.status = STATUS.loading;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.status = STATUS.error;
        state.error = payload;
      });
  },
});

export const authReducer = persistReducer(
  {
    key: 'auth',
    storage,
  },
  authSlice.reducer
);
