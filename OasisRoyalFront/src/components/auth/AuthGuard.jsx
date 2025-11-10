import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

/**
 * Higher-Order Component to protect routes that require authentication
 * Usage: <AuthGuard><YourComponent /></AuthGuard>
 */
const AuthGuard = ({ children, redirectTo = '/login' }) => {
  const { requireAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      navigate(redirectTo, {
        state: { from: location.pathname },
        replace: true
      })
    }
  }, [requireAuth, navigate, redirectTo, location])
  
  // If user is authenticated, render children
  if (requireAuth()) {
    return <>{children}</>
  }
  
  // Otherwise, return null while redirecting
  return null
}

export default AuthGuard
