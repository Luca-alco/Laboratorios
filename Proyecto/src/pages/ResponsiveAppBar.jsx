import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../img/logo.png';  // Importamos el logo

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const pages = isAuthenticated ? ['Productos', 'Vender'] : ['Productos', 'Vender', 'Ingresar'];
  const settings = ['Perfil', 'Cerrar Sesión'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Cerrar Sesión') {
      logout();
      navigate('/');
    } else if (setting === 'Perfil') {
      navigate('/perfil');
    }
  };

  const handlePageClick = (page) => {
    switch (page) {
        case 'Productos':
            navigate('/productos');
            break;
        case 'Vender':
            if (!isAuthenticated) {
                navigate('/login');
            } else {
                navigate('/nueva-publicacion');
            }
            break;
        case 'Ingresar':
            navigate('/login');
            break;
        default:
            break;
    }
    handleCloseNavMenu();
  };

  const getInitials = () => {
    if (currentUser) {
      return `${currentUser.nombre[0]}${currentUser.apellido[0]}`.toUpperCase();
    }
    return '';
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#0D0D0D' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              marginRight: 1,
              display: { xs: 'none', md: 'flex' }
            }}
            alt="Logo"
            src={logo}  // Usamos la imagen importada
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            Rimboket
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menú"
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Carrito de compras">
              <IconButton onClick={() => navigate('/carrito')} sx={{ color: 'white' }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={isAuthenticated ? "Abrir configuración" : "Ir al perfil"}>
              <IconButton onClick={isAuthenticated ? handleOpenUserMenu : () => navigate('/login')} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: isAuthenticated ? 'primary.main' : '#0D0D0D', borderRadius: isAuthenticated ? '50%' : 0, width: isAuthenticated ? 40 : 80, backgroundColor: "black" }}>
                  {isAuthenticated ? getInitials() : 'Perfil'}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            {isAuthenticated && (
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
