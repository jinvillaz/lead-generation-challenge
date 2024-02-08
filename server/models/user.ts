export interface User {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
  company: string
  phoneNumber: string
}

export interface BodyUser {
  email: string
  role: Role
  firstName: string
  lastName: string
  company: string
  phoneNumber: string
  password: string
}

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}
