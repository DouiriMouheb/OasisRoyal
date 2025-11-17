import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../store/slices/authSlice'
import Input from '../common/Input'
import Button from '../common/Button'
import Alert from '../common/Alert'

const ProfileForm = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: ''
    }
  })

  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          postalCode: user.address?.postalCode || '',
          country: user.address?.country || ''
        }
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Check if it's an address field
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')

    try {
      await dispatch(updateUserProfile(formData)).unwrap()
      setSuccessMessage('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your.email@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      {/* Address Information */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
        
        <Input
          label="Street Address"
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          placeholder="123 Main Street"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="New York"
          />

          <Input
            label="Postal Code"
            type="text"
            name="address.postalCode"
            value={formData.address.postalCode}
            onChange={handleChange}
            placeholder="10001"
          />
        </div>

        <Input
          label="Country"
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          placeholder="United States"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
