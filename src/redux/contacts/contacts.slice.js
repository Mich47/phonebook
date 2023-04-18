import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from 'constants/status.constants';
import {
  deleteContact,
  fetchContacts,
  patchContact,
  postContact,
} from 'redux/contacts/contacts.operations';

const initialState = {
  items: [],
  status: STATUS.idle,
  error: null,
};

const handlePending = state => {
  state.status = STATUS.loading;
};
const handleRejected = (state, { payload }) => {
  state.status = STATUS.error;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(({ _id }) => _id === payload._id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(postContact.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(postContact.rejected, handleRejected)
      .addCase(patchContact.pending, handlePending)
      .addCase(patchContact.fulfilled, (state, { payload }) => {
        state.status = STATUS.success;
        state.error = null;
        const index = state.items.findIndex(({ _id }) => _id === payload._id);
        state.items.splice(index, 1, payload);
      })
      .addCase(patchContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
