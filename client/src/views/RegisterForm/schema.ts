import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Enter a valid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  company: Yup.string(),
  phoneNumber: Yup.string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .min(7, 'Phone number must be at least 10 digits long')
    .max(15, 'Phone number cannot be longer than 15 digits')
})
