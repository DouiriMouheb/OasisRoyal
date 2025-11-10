import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Mail, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Input from '../common/Input'
import Button from '../common/Button'

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
}).required()

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })
  
  const onSubmit = async (data) => {
    console.log('📋 FORM SUBMIT: Login form submitted with data:', data)
    setIsLoading(true)
    try {
      console.log('📋 FORM: Calling login hook...')
      const result = await login(data.email, data.password)
      console.log('📋 FORM: Login result:', result)
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('📋 FORM ERROR:', error)
      // Error handling is done in useAuth hook
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-5 h-5" />}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="mr-2 rounded text-amber-600 focus:ring-amber-500"
          />
          <span className="text-gray-700">Remember me</span>
        </label>
        <a href="#" className="text-amber-600 hover:text-amber-700 font-medium">
          Forgot password?
        </a>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        size="lg"
      >
        Sign In
      </Button>
      
      {onSwitchToRegister && (
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Sign up
          </button>
        </p>
      )}
    </form>
  )
}

export default LoginForm
