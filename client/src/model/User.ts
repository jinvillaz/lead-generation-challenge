export interface User {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
  company: string
  phoneNumber: string
}

export interface UserForm {
  email: string
  password: string
  firstName: string
  lastName: string
  company: string
  phoneNumber: string
  role: string
}
