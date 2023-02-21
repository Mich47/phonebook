import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { ContactForm } from 'components/ContactsForm/ContactsForm';
import { IconButton, Stack } from '@mui/material';

export const ModalEditContact = ({ id, open, setOpen }) => {
  const handleClose = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('number');
    setOpen(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth="xs" open={open} onClose={handleClose}>
      <Stack direction="row" justifyContent="space-between">
        <DialogTitle>Edit contact</DialogTitle>
        <DialogTitle>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      </Stack>
      <DialogContent>
        <ContactForm editedId={id} />
      </DialogContent>
    </Dialog>
  );
};
