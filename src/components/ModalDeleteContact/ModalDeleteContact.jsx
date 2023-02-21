import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/contacts.operations';
import { toast } from 'react-toastify';

export const ModalDeleteContact = ({ id, open, setOpen }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = async id => {
    try {
      await dispatch(deleteContact(id)).unwrap();
      toast.success('Contact deleted');
    } catch (error) {
      toast.error('Error deleting contact');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {'Delete from contacts?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This contact will be permanently deleted from this account .
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} autoFocus>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleDeleteContact(id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
