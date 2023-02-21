import {
  Avatar,
  Box,
  CircularProgress,
  CssBaseline,
  Typography,
} from '@mui/material';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';

import { ContactsTable } from 'components/ContactsTable/ContactsTable';
import { Filter } from 'components/Filter/Filter';
import { STATUS } from 'constants/status.constants';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from 'redux/auth/auth.selectors';
import { Container } from '@mui/system';

export default function Contacts() {
  const status = useSelector(selectAuthStatus);
  return (
    <>
      <Container component="section" maxWidth="md">
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
              <ContactPhoneRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" textAlign="center">
              My Contacts
            </Typography>
            <Filter />
            <ContactsTable />
          </Box>
        )}
      </Container>
    </>
  );
}
