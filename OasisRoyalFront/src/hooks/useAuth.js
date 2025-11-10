import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginUser, registerUser, logout } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, isAuthenticated, loading, error } = useSelector(state => state.auth)
  
  const login = async (email, password) => {
    try {
      const result = await dispatch(loginUser({ email, password }))
      if (result.type === 'auth/login/fulfilled') {
        toast.success(`Welcome back, ${result.payload.name || 'User'}!`)
        return { success: true }
      } else {
        toast.error(result.payload || 'Login failed')
        return { success: false, error: result.payload }
      }
    } catch (err) {
      toast.error('An error occurred during login')
      return { success: false, error: err.message }
    }
  }
  
  const register = async (userData) => {
    try {
      const result = await dispatch(registerUser(userData))
      if (result.type === 'auth/register/fulfilled') {
        toast.success(`Welcome, ${userData.name}! Your account has been created.`)
        return { success: true }
      } else {
        toast.error(result.payload || 'Registration failed')
        return { success: false, error: result.payload }
      }
    } catch (err) {
      toast.error('An error occurred during registration')
      return { success: false, error: err.message }
    }
  }
  
  const handleLogout = () => {
    dispatch(logout())
    toast.success('You have been logged out')
    navigate('/login')
  }
  
  const requireAuth = (redirectTo = '/login') => {
    if (!isAuthenticated) {
      toast.error('Please login to continue')
      navigate(redirectTo, { state: { from: window.location.pathname } })
      return false
    }
    return true
  }
  
  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
    requireAuth
  }
}
