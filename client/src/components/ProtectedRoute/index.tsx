import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  allowedRoles: string[]
  children: ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useAuth()

  const isAllowed = user && allowedRoles.includes(user.role)
  if (!isAllowed) {
    return <Navigate to="/access-denied" />
  }

  return <>{children}</>
}
