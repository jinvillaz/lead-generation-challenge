import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { validationSchema } from './schema'
import { CustomField } from '../../components/CustomField'
import { useAuth } from '../../hooks/useAuth'

interface FormValues {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const initValues = {
    email: '',
    password: '',
  }

  const onsubmit = (values: FormValues) => {
    login(values.email, values.password)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Log in
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={onsubmit}
        >
          {({ dirty, isValid }) => {
            return (
              <Form>
                <Grid container spacing={5} sx={{ padding: '30px 0px' }}>
                  <Grid item xs={12}>
                    <CustomField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomField name="password" label="Password" type="password" />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button type="submit" variant="contained" disabled={!(isValid && dirty)}>
                      Log in
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )
          }}
        </Formik>
      </Paper>
    </Container>
  )
}
