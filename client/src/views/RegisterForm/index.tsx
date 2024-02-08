import { Button, Container, Grid, Paper, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { validationSchema } from './schema'
import { CustomField } from '../../components/CustomField'
import { useAuth } from '../../hooks/useAuth'
import { UserForm } from '../../model/User'
import { USER } from '../../constants'

export const RegisterForm: React.FC = () => {
  const { register } = useAuth()
  const initValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    phoneNumber: '',
    role: USER
  }

  const onSubmit = (values: UserForm) => {
    register(values)
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Registration
        </Typography>
        <Formik
          enableReinitialize={true}
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
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
                  <Grid item xs={12}>
                    <CustomField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomField name="lastName" label="Last Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomField name="company" label="Company" />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomField name="phoneNumber" label="Phone Number" type="number" />
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Button type="submit" variant="contained" disabled={!(isValid && dirty)}>
                      Register
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
