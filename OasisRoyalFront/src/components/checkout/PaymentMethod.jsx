import { useState } from 'react'
import Button from '../common/Button'
import { CreditCard, DollarSign, Wallet } from 'lucide-react'

const PaymentMethod = ({ onSubmit, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('cash') // cash, paypal, stripe

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: Wallet,
      color: 'blue',
      disabled: true // Will be enabled when integrated
    },
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      description: 'Pay with Stripe',
      icon: CreditCard,
      color: 'purple',
      disabled: true // Will be enabled when integrated
    }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(selectedMethod)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Payment Method</h2>

        <div className="space-y-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <label
                key={method.id}
                className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  method.disabled
                    ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                    : selectedMethod === method.id
                    ? `border-${method.color}-500 bg-${method.color}-50`
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  disabled={method.disabled}
                  className="sr-only"
                />
                
                <div className="flex items-start space-x-4 flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      method.disabled
                        ? 'bg-gray-200'
                        : selectedMethod === method.id
                        ? `bg-${method.color}-500`
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        method.disabled
                          ? 'text-gray-400'
                          : selectedMethod === method.id
                          ? 'text-white'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {method.name}
                        {method.disabled && (
                          <span className="ml-2 text-xs font-normal text-gray-500">(Coming Soon)</span>
                        )}
                      </h3>
                      {!method.disabled && selectedMethod === method.id && (
                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                  </div>
                </div>
              </label>
            )
          })}
        </div>

        {/* Cash on Delivery Info */}
        {selectedMethod === 'cash' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">About Cash on Delivery</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Pay in cash when your order is delivered</li>
              <li>• Payment will be confirmed by our logistics service</li>
              <li>• Please have the exact amount ready</li>
              <li>• You can inspect the product before payment</li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary">
          Continue to Review
        </Button>
      </div>
    </form>
  )
}

export default PaymentMethod
