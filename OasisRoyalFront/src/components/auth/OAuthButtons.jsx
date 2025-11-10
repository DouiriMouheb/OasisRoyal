import { Chrome, Facebook } from 'lucide-react'
import Button from '../common/Button'
import { API_URL } from '../../utils/constants'

const OAuthButtons = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend OAuth route
    window.location.href = `${API_URL}/auth/google`
  }
  
  const handleFacebookLogin = () => {
    // Redirect to backend OAuth route
    window.location.href = `${API_URL}/auth/facebook`
  }
  
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          icon={<Chrome className="w-5 h-5 text-red-500" />}
        >
          Google
        </Button>
        <Button
          onClick={handleFacebookLogin}
          variant="outline"
          icon={<Facebook className="w-5 h-5 text-blue-600" />}
        >
          Facebook
        </Button>
      </div>
    </div>
  )
}

export default OAuthButtons
