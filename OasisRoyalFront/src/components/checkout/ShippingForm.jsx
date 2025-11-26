import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Input from '../common/Input'
import Button from '../common/Button'
import Card from '../common/Card'
import { MapPin, Home, Plus } from 'lucide-react'

const ShippingForm = ({ onSubmit, onBack }) => {
  const { user } = useSelector((state) => state.auth)
  const hasUserAddress = user?.address && (user.address.street || user.address.city)
  const [useProfileAddress, setUseProfileAddress] = useState(hasUserAddress)

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  })

  useEffect(() => {
    // Pre-fill from user profile if available and user chooses to use it
    if (user?.address && useProfileAddress) {
      setFormData({
        street: user.address.street || '',
        city: user.address.city || '',
        postalCode: user.address.postalCode || '',
        country: user.address.country || '',
        phone: user.phone || ''
      })
    } else if (!useProfileAddress) {
      // Clear form when switching to new address
      setFormData({
        street: '',
        city: '',
        postalCode: '',
        country: '',
        phone: user?.phone || ''
      })
    }
  }, [user, useProfileAddress])

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
      {/* Address Selection - Always show */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          Select Shipping Address
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Use Saved Address - Only if available */}
          {hasUserAddress && (
            <Card
              className={`cursor-pointer transition-all ${
                useProfileAddress
                  ? 'ring-2 ring-blue-600 border-blue-600'
                  : 'hover:border-gray-400'
              }`}
              onClick={() => setUseProfileAddress(true)}
            >
              <Card.Body>
                <div className="flex items-start">
                  <input
                    type="radio"
                    checked={useProfileAddress}
                    onChange={() => setUseProfileAddress(true)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Home className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-semibold text-gray-900">My Address</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {user.address.street}
                      {user.address.street && <br />}
                      {user.address.city && `${user.address.city}, `}
                      {user.address.postalCode}
                      {user.address.postalCode && <br />}
                      {user.address.country}
                    </p>
                    {user.phone && (
                      <p className="text-sm text-gray-600 mt-1">
                        Phone: {user.phone}
                      </p>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Use New Address - Always show */}
          <Card
            className={`cursor-pointer transition-all ${
              !useProfileAddress || !hasUserAddress
                ? 'ring-2 ring-blue-600 border-blue-600'
                : 'hover:border-gray-400'
            }`}
            onClick={() => setUseProfileAddress(false)}
          >
            <Card.Body>
              <div className="flex items-start">
                <input
                  type="radio"
                  checked={!useProfileAddress || !hasUserAddress}
                  onChange={() => setUseProfileAddress(false)}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Plus className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="font-semibold text-gray-900">
                      {hasUserAddress ? 'New Address' : 'Enter Address'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {hasUserAddress 
                      ? 'Use a different shipping address' 
                      : 'Enter your shipping address'}
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Shipping Form */}
      {(!hasUserAddress || !useProfileAddress) && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <MapPin className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">
              {hasUserAddress ? 'Enter New Shipping Address' : 'Shipping Address'}
            </h2>
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
      )}

      {/* Show saved address summary when using profile address */}
      {hasUserAddress && useProfileAddress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Shipping to:</strong> {user.address.street}, {user.address.city}, {user.address.postalCode}, {user.address.country}
          </p>
        </div>
      )}

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
