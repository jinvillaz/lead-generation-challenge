import React from 'react'
import { Container, Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const HomeView: React.FC = () => {
  const { user } = useAuth()

  return (
    <Container maxWidth="md">
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '400px', gap: '20px' }} >
        <Typography variant="h2">Welcome Back, {user?.firstName}!</Typography>
        <Typography variant="body1">
          Ready to take your business to the next level with our expert IT development services?
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/services">
          Explore Our Services
        </Button>
        <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>
          <Button component={Link} to="/contact" sx={{ marginRight: '10px' }}>
            Contact Us
          </Button>
          <Button component={Link} to="/about">
            About Us
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
