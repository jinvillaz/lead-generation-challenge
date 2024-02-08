import React from 'react'
import { Button, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export const PublicView: React.FC = () => (
  <Container maxWidth="md">
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: '400px', gap: '20px' }}
    >
      <Typography variant="h2" align="center">
        Welcome to Our IT Development Services
      </Typography>
      <Typography variant="body1">
        Take your business to the next level with our expert IT development services! Our team of experienced developers
        is dedicated to delivering high-quality solutions tailored to your unique needs.
      </Typography>
      <Typography variant="body1">
        Whether you need web development, mobile app development, or custom software solutions, we've got you covered.
        Join our community of satisfied clients and unlock the full potential of your business.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/register">
        Join Now
      </Button>
      <Typography variant="body1">
        Ready to get started? <Link to="/login">Sign in</Link> to access our services.
      </Typography>
    </Grid>
  </Container>
)
