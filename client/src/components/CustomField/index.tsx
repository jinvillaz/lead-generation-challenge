import { Box, TextField, Typography } from '@mui/material'
import { ErrorMessage, Field, FormikProps } from 'formik'

interface CustomFieldProps {
  name: string
  label: string
  type?: string
}

export const CustomField: React.FC<CustomFieldProps> = ({ name, label, type = 'text', ...props }) => {
  return (
    <Box sx={{ height: 60 }}>
      {label && <Typography>{label}</Typography>}
      <Field type="text" name={name} {...props}>
        {({ form }: { form: FormikProps<CustomFieldProps> }) => (
          <TextField
            variant="standard"
            onChange={e => {
              form.setFieldValue(name, e.target.value)
              form.setFieldTouched(name, true)
            }}
            type={type}
            onBlur={() => form.setFieldTouched(name, true)}
            fullWidth
          />
        )}
      </Field>
      <Typography sx={{ color: 'red' }}>
        <ErrorMessage name={name} />
      </Typography>
    </Box>
  )
}
