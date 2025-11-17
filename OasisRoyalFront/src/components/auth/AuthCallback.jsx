import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../store/slices/authSlice'
import { syncCartAsync } from '../../store/slices/cartSlice'
import Loader from '../common/Loader'
import toast from 'react-hot-toast'

/**
 * OAuth Callback Component
 * Handles the redirect after OAuth authentication
 */
const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    const token = searchParams.get('token')
    const user = searchParams.get('user')
    const error = searchParams.get('error')
    
    if (error) {
      toast.error(`Authentication failed: ${error}`)
      navigate('/login', { replace: true })
      return
    }
    
    if (token && user) {
      try {
        // Decode user data (sent as base64 encoded JSON)
        const userData = JSON.parse(atob(user))
        
        // Store credentials
        dispatch(setCredentials({ user: userData, token }))
        
        // Sync cart after OAuth login
        const localCart = localStorage.getItem('cart')
        if (localCart) {
          const cart = JSON.parse(localCart)
          console.log('🔐 OAuth: Syncing cart with', cart.items?.length || 0, 'items')
          dispatch(syncCartAsync(cart))
        }
        
        // Success message
        toast.success(`Welcome back, ${userData.name}!`)
        
        // Redirect to intended page or home
        const intendedPath = sessionStorage.getItem('intendedPath') || '/'
        sessionStorage.removeItem('intendedPath')
        navigate(intendedPath, { replace: true })
      } catch (err) {
        console.error('Error parsing OAuth response:', err)
        toast.error('Authentication error. Please try again.')
        navigate('/login', { replace: true })
      }
    } else {
      toast.error('Invalid authentication response')
      navigate('/login', { replace: true })
    }
  }, [searchParams, navigate, dispatch])
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader size="lg" text="Completing authentication..." />
    </div>
  )
}

export default AuthCallback
