import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { User, Mail, Lock, Phone } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Input from '../common/Input'
import Button from '../common/Button'

const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .optional()
}).required()

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const { register: registerUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema)
  })
  
  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const { confirmPassword, ...userData } = data
      await registerUser(userData)
      if (onSuccess) onSuccess()
    } catch (error) {
      // Error handling is done in useAuth hook
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={<User className="w-5 h-5" />}
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      
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
          label="Phone Number (Optional)"
          type="tel"
          placeholder="+212 6XX XXX XXX"
          icon={<Phone className="w-5 h-5" />}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>
      
      <div>
        <Input
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          icon={<Lock className="w-5 h-5" />}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      
      <div>
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          icon={<Lock className="w-5 h-5" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>
      
      <div className="text-sm">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            required
            className="mt-1 mr-2 rounded text-amber-600 focus:ring-amber-500"
          />
          <span className="text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={isLoading}
        size="lg"
      >
        Create Account
      </Button>
      
      {onSwitchToLogin && (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Sign in
          </button>
        </p>
      )}
    </form>
  )
}

export default RegisterForm
