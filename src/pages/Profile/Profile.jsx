import { Box, Container, CssBaseline, Typography } from '@mui/material';

export default function Profile() {
  return (
    <>
      <Container component="section" maxWidth="xs">
        <CssBaseline />
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddAltRoundedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5" textAlign="center">
            Profile. Coming soon...
          </Typography>
          {/* <ContactForm /> */}
        </Box>
      </Container>
    </>
  );
}
