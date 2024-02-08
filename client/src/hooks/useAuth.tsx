import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserForm } from '../model/User'
import { ADMIN } from '../constants'
import { userService } from '../services/user.service'
import { notificationService } from '../services/notification.service'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  register: (data: UserForm) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    try {
      const userData = userService.login(email, password)
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      let route = '/home'
      if (userData.role === ADMIN) {
        route = '/admin-zone'
      }
      navigate(route)
    } catch (e) {
      notificationService.handleError(e)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate('/login')
  }

  const register = (userData: UserForm) => {
    try {
      const registeredUser = userService.register(userData)
      setUser(registeredUser)
      navigate('/home')
    } catch (error) {
      notificationService.handleError(error)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User
      setUser(userData)
      let route = '/home'
      if (userData.role === ADMIN) {
        route = '/admin-zone'
      }
      navigate(route)
    }
  }, [navigate])

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth should be user inside AuthProvider')
  }
  return context
}
