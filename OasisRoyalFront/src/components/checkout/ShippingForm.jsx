import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Input from '../common/Input'
import Button from '../common/Button'
import { MapPin } from 'lucide-react'

const ShippingForm = ({ onSubmit, onBack }) => {
  const { user } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  })

  useEffect(() => {
    // Pre-fill from user profile if available
    if (user?.address) {
      setFormData({
        street: user.address.street || '',
        city: user.address.city || '',
        postalCode: user.address.postalCode || '',
        country: user.address.country || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
        </div>

        <div className="space-y-4">
          <Input
            label="Street Address"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            placeholder="123 Main Street"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="New York"
            />

            <Input
              label="Postal Code"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              placeholder="10001"
            />
          </div>

          <Input
            label="Country"
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            placeholder="United States"
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div className="flex justify-between">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back to Cart
          </Button>
        )}
        <Button type="submit" variant="primary" className="ml-auto">
          Continue to Payment
        </Button>
      </div>
    </form>
  )
}

export default ShippingForm
