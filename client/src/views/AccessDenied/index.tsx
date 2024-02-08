import { Container, Grid, Typography } from '@mui/material'

export const AccessDenied = () => {
  return (
    <Container maxWidth="md">
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
        <Typography variant="h2">AccessDenied</Typography>
      </Grid>
    </Container>
  )
}
