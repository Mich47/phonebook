import {
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Container,
  CssBaseline,
} from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { ContactForm } from 'components/ContactsForm/ContactsForm';
import { STATUS } from 'constants/status.constants';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from 'redux/auth/auth.selectors';

export default function NewContact() {
  const status = useSelector(selectAuthStatus);
  return (
    <>
      <Container component="section" maxWidth="xs">
        <CssBaseline />
        {status === STATUS.loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress size={100} />
          </Box>
        )}
        {status === STATUS.success && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '24px',
              mx: 'auto',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddAltRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" textAlign="center">
              New Contact
            </Typography>
            <ContactForm />
          </Box>
        )}
      </Container>
    </>
  );
}
