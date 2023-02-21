import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useMemo, useState } from 'react';
import { LinkStyled, NavLinkStyled } from './SharedLayout.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from 'redux/auth/auth.selectors';
import { CssBaseline } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { logoutUser } from 'redux/auth/auth.operations';
import { toast } from 'react-toastify';

export const SharedLayout = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = useSelector(selectAuthToken);

  const dispatch = useDispatch();

  const pages = useMemo(
    () =>
      token
        ? [
            <NavLinkStyled to="/contacts">My Contacts</NavLinkStyled>,
            <NavLinkStyled to="/new-contact">New Contact</NavLinkStyled>,
          ]
        : [
            <NavLinkStyled to="/login">Login</NavLinkStyled>,
            <NavLinkStyled to="/register">Register</NavLinkStyled>,
          ],
    [token]
  );

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      toast.error('Logout error');
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <PeopleAltIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              size="large"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CONTACTS
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    sx={{ p: 0, justifyContent: 'center' }}
                    onClick={handleCloseNavMenu}
                  >
                    {page}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PeopleAltIcon
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
              }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              CONTACTS
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, index) => (
                <Button
                  key={index}
                  sx={{ p: 0, color: 'white', display: 'block' }}
                  onClick={handleCloseNavMenu}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {token && (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    textAlign="center"
                    sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}
                  >
                    {token.user?.name && ''}
                  </Typography>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        sx={{ p: 0, justifyContent: 'center' }}
                        onClick={handleCloseUserMenu}
                      >
                        <LinkStyled to="/profile">Profile</LinkStyled>
                      </MenuItem>
                      <MenuItem
                        sx={{ p: 0, justifyContent: 'center' }}
                        onClick={handleLogout}
                      >
                        <LinkStyled to="/login">Logout</LinkStyled>
                      </MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ py: 3 }}>
        {children}
      </Box>
    </>
  );
};
