import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Container,
  Avatar,
  Divider,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Search,
  LocalShipping,
  Favorite,
  Menu as MenuIcon,
  Home,
  Store,
  CardGiftcard,
  Person,
  ExitToApp,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import Logo from './Logo';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  border: '2px solid transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1),
    borderColor: theme.palette.primary.main,
  },
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 1),
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 400,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const ModernNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleUserMenuClose();
  };

  const navigationItems = [
    { name: 'Home', path: '/', icon: <Home /> },
    { name: 'Products', path: '/products', icon: <Store /> },
    { name: 'Personalized', path: '/products?category=personalized', icon: <CardGiftcard /> },
  ];

  const isActivePath = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mr: 4,
            }}
          >
            <Logo size="medium" onClick={() => navigate('/')} />
          </Box>

          {/* Navigation Items - Desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mr: 'auto' }}>
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  color: 'white',
                  mx: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: isActivePath(item.path) ? 'bold' : 'normal',
                  bgcolor: isActivePath(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Search Box */}
          <SearchBox sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for gifts..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBox>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Wishlist */}
            <Tooltip title="My Wishlist" arrow>
              <Button
                color="inherit" 
                startIcon={
                  <Badge badgeContent={0} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}>
                    <Favorite sx={{ fontSize: 22 }} />
                  </Badge>
                }
                sx={{ 
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.15)',
                  },
                  transition: 'all 0.3s ease',
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Wishlist
              </Button>
            </Tooltip>

            {/* Shopping Cart */}
            <Tooltip title="Shopping Cart" arrow>
              <Button
                color="inherit"
                onClick={() => navigate('/cart')}
                startIcon={
                  <Badge badgeContent={cartItemsCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}>
                    <ShoppingCart sx={{ fontSize: 22 }} />
                  </Badge>
                }
                sx={{ 
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  borderRadius: '20px',
                  '&:hover': { 
                    bgcolor: 'rgba(255,255,255,0.15)',
                  },
                  transition: 'all 0.3s ease',
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Cart
              </Button>
            </Tooltip>

            {/* Mobile Icons Only */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1 }}>
              <Tooltip title="Wishlist" arrow>
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    color: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.15)',
                    },
                  }}
                >
                  <Badge badgeContent={0} color="error">
                    <Favorite />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="Cart" arrow>
                <IconButton
                  color="inherit"
                  onClick={() => navigate('/cart')}
                  sx={{ 
                    color: 'white',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.15)',
                    },
                  }}
                >
                  <Badge badgeContent={cartItemsCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <Tooltip title={`Hi ${user?.firstName || 'User'}! Click to manage your account`} arrow>
                  <Button
                    color="inherit"
                    onClick={handleUserMenuClick}
                    sx={{
                      color: 'white',
                      ml: 3,
                      textTransform: 'none',
                      borderRadius: '30px',
                      px: 3,
                      py: 1.5,
                      minWidth: '180px',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        width: 40, 
                        height: 40,
                        bgcolor: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        border: '2px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem', whiteSpace: 'nowrap' }}>
                        My Account
                      </Typography>
                    </Box>
                  </Button>
                </Tooltip>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 220,
                      borderRadius: 3,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      '& .MuiMenuItem-root': {
                        borderRadius: 2,
                        mx: 1,
                        my: 0.5,
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.04)',
                        }
                      }
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <MenuItem 
                    onClick={() => { navigate('/profile'); handleUserMenuClose(); }}
                    sx={{ py: 1.5 }}
                  >
                    <Person sx={{ mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>My Profile</Typography>
                      <Typography variant="caption" color="text.secondary">Manage your account</Typography>
                    </Box>
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={handleLogout} 
                    sx={{ color: 'error.main', py: 1.5 }}
                  >
                    <ExitToApp sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>Logout</Typography>
                      <Typography variant="caption">Sign out of your account</Typography>
                    </Box>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2} sx={{ ml: 2 }}>
                <Tooltip title="Sign in to your account" arrow>
                  <Button
                    color="inherit"
                    onClick={() => navigate('/login')}
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
                      minWidth: '120px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      textTransform: 'none',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.1)',
                        borderColor: 'rgba(255,255,255,0.5)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign In
                  </Button>
                </Tooltip>
                <Tooltip title="Create new account" arrow>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/register')}
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      borderRadius: '30px',
                      px: 4,
                      py: 1.5,
                      minWidth: '120px',
                      bgcolor: 'white',
                      color: 'primary.main',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      '&:hover': { 
                        bgcolor: 'rgba(255,255,255,0.95)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Sign Up
                  </Button>
                </Tooltip>
              </Stack>
            )}

            {/* Mobile Menu */}
            <IconButton
              color="inherit"
              onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                color: 'white',
                ml: 1,
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={() => setMobileMenuAnchor(null)}
        PaperProps={{
          sx: {
            mt: 1,
            width: 250,
            borderRadius: 2,
          },
        }}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setMobileMenuAnchor(null);
            }}
            sx={{
              py: 1.5,
              bgcolor: isActivePath(item.path) ? 'primary.light' : 'transparent',
              color: isActivePath(item.path) ? 'primary.contrastText' : 'inherit',
            }}
          >
            <Box sx={{ mr: 2 }}>{item.icon}</Box>
            {item.name}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem sx={{ py: 1.5 }}>
          <SearchBox sx={{ width: '100%' }}>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search gifts..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ width: '100%' }}
            />
          </SearchBox>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default ModernNavbar;
