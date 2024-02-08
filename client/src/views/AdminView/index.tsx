import React from 'react'
import { Container, Grid, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

export const AdminView: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ height: '400px', gap: '20px' }}>
        <Typography variant="h2">Admin Dashboard</Typography>
        <Typography variant="body1">
          Welcome to the admin dashboard. Here you can manage all aspects of the platform.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/leads">
          View Leads
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/users">
          Manage Users
        </Button>
        <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ marginTop: '20px' }}>
          <Button component={Link} to="/settings" sx={{ marginBottom: '10px' }}>
            Account Settings
          </Button>
          <Button component={Link} to="/analytics">
            View Analytics
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
