import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { Home as HomeIcon, Menu as MenuIcon, Person, SupervisorAccount } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ADMIN, USER, pagesForUser, pagesForAdmin } from '../../constants'
import { useAuth } from '../../hooks/useAuth'

export const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    setAnchorElUser(null)
    logout()
  }

  const goTo = (route: string) => {
    navigate(route)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
            Lead Generation for IT Services
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              {user &&
                user.role === USER &&
                pagesForUser.map(({ label, path }, key: number) => (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      handleCloseNavMenu()
                      goTo(path)
                    }}
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
              {user &&
                user.role === ADMIN &&
                pagesForAdmin.map(({ label, path }, key: number) => (
                  <MenuItem
                    key={key}
                    onClick={() => {
                      handleCloseNavMenu()
                      goTo(path)
                    }}
                  >
                    <Typography textAlign="center">{label}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <HomeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
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
            Lead Generation for IT Services
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user &&
              user.role === USER &&
              pagesForUser.map(({ label, path }, key: number) => (
                <Button
                  key={key}
                  onClick={() => {
                    handleCloseNavMenu()
                    goTo(path)
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {label}
                </Button>
              ))}
            {user &&
              user.role === ADMIN &&
              pagesForAdmin.map(({ label, path }, key: number) => (
                <Button
                  key={key}
                  onClick={() => {
                    handleCloseNavMenu()
                    goTo(path)
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {label}
                </Button>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user && (
              <Box display="flex" alignItems="center">
                <Typography variant="body1">{user.email}</Typography>
                <Tooltip title="Settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                    <Avatar alt="Avatar">
                      {user.role === ADMIN && <SupervisorAccount />}
                      {user.role === USER && <Person />}
                    </Avatar>
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
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {!user && (
              <Tooltip title="Settings">
                <IconButton sx={{ p: 0, ml: 2 }} onClick={() => goTo('/login')}>
                  <Avatar alt="Avatar" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
