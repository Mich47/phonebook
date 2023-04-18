import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { patchContact, postContact } from 'redux/contacts/contacts.operations';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const ContactForm = ({ editedId }) => {
  const contacts = useSelector(selectContacts);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState(() => localStorage.getItem('name') ?? '');
  const [nameError, setNameError] = useState(false);
  const changeName = event => {
    const { value } = event.target;
    localStorage.setItem('name', value);
    setName(value);
    setNameError(false);
  };

  const [number, setNumber] = useState(
    () => localStorage.getItem('number') ?? ''
  );
  const [numberError, setNumberError] = useState(false);
  const changeNumber = event => {
    const { value } = event.target;
    localStorage.setItem('number', value);
    setNumber(value);
    setNumberError(false);
  };

  const handleSubmitForm = async (event, name, number) => {
    event.preventDefault();
    //Контакт вже існує і не редагується
    if (!editedId && contacts.some(contact => contact.name === name)) {
      toast.warning(`${name} is already in contacts.`);
      setNameError(true);
      return;
    }

    //Інакше оновлює, або додає новий контакт
    try {
      editedId
        ? await dispatch(patchContact({ _id: editedId, name, number })).unwrap()
        : await dispatch(postContact({ name, number })).unwrap();
    } catch (error) {
      toast.error('Error saving contact');
    }
    navigate('/contacts');
    toast.success('Contact saved successfully');
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setNumber('');
    localStorage.removeItem('name');
    localStorage.removeItem('number');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
        autoComplete="off"
        onSubmit={event => handleSubmitForm(event, name, number)}
      >
        <Box display="flex" flexDirection="column">
          <TextField
            error={nameError}
            inputProps={{
              pattern:
                "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
              title:
                "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
            }}
            id="name"
            label="Name"
            variant="outlined"
            value={name}
            type="text"
            name="name"
            required
            autoFocus
            onInvalid={() => setNameError(true)}
            onChange={changeName}
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <TextField
            error={numberError}
            inputProps={{
              inputMode: 'numeric',
              pattern:
                '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
              title:
                'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
            }}
            id="number"
            label="Number"
            variant="outlined"
            value={number}
            type="tel"
            name="number"
            required
            onInvalid={() => setNumberError(true)}
            onChange={changeNumber}
          />
        </Box>
        <Button variant="contained" type="submit">
          Save
        </Button>
      </Box>
    </Box>
  );
};

ContactForm.propTypes = {
  editedId: PropTypes.string,
};
