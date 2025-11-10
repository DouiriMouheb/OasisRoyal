import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import OAuthButtons from '../components/auth/OAuthButtons'
import { UserCircle } from 'lucide-react'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get the page user was trying to access
  const from = location.state?.from || '/'
  
  const handleSuccess = () => {
    // Redirect to the page they were trying to access, or home
    navigate(from, { replace: true })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold text-amber-600">Oasis Royal</h1>
          </Link>
          <div className="mt-6 flex justify-center">
            <UserCircle className="w-16 h-16 text-amber-600" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Join us and discover premium Tunisian dates'}
          </p>
        </div>
        
        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* OAuth Buttons */}
          <OAuthButtons />
          
          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? 'Or sign in with email' : 'Or sign up with email'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Login/Register Form */}
          {isLogin ? (
            <LoginForm 
              onSuccess={handleSuccess}
              onSwitchToRegister={() => setIsLogin(false)}
            />
          ) : (
            <RegisterForm 
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setIsLogin(true)}
            />
          )}
        </div>
        
        {/* Footer Links */}
        <div className="text-center text-sm text-gray-600">
          <Link to="/" className="hover:text-amber-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
