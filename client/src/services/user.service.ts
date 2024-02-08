import { UserForm, User } from '../model/User'

interface FakeUser extends User {
  password: string
}

const getId = () => {
  return Date.now().toString(16)
}

class UserService {
  users: FakeUser[]

  constructor() {
    this.users = [
      {
        id: getId(),
        email: 'test@example.com',
        password: '123',
        role: 'user',
        firstName: 'test',
        lastName: 'test',
        company: 'test',
        phoneNumber: '123456',
      },
      {
        id: getId(),
        email: 'admin@example.com',
        password: '123',
        role: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        company: 'admin',
        phoneNumber: '123457',
      },
    ]
  }

  login(emailField: string, pass: string) {
    const user = this.users.find((u) => u.email === emailField && u.password === pass)

    if (!user) {
      throw new Error('Invalid credentials')
    }
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  logout() {
    return true
  }

  register(data: UserForm) {
    const newUser = { id: getId(), ...data }
    this.users.push(newUser)
    return newUser
  }
}

export const userService = new UserService()
