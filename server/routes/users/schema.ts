import * as yup from 'yup'
import { BodyUser, Role } from '../../models/user'

export const schemaValidator: yup.ObjectSchema<BodyUser> = yup
  .object({
    email: yup.string().defined(),
    firstName: yup.string().defined(),
    lastName: yup.string().defined(),
    phoneNumber: yup.string().defined(),
    password: yup.string().defined(),
    company: yup.string(),
    role: yup.mixed<Role>().oneOf(Object.values(Role)).defined(),
  })
  .noUnknown(true, (err) => {
    return `invalid field: ${err.unknown}`
  })
  .strict()
