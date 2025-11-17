import { useSelector } from 'react-redux'
import { Package, MapPin, CreditCard, Truck } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import Button from '../common/Button'

const OrderSummary = ({ shippingAddress, paymentMethod, onSubmit, onBack, loading }) => {
  const { items, subtotal, shipping, tax, total } = useSelector((state) => state.cart)

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'cash':
      case 'cod':
        return 'Cash on Delivery'
      case 'paypal':
        return 'PayPal'
      case 'stripe':
        return 'Credit/Debit Card'
      default:
        return method
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Items */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Package className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
        </div>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                {item.product.images?.[0] ? (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                <p className="text-xs text-gray-600">{formatPrice(item.price)} each</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
        </div>
        <div className="text-gray-700">
          <p>{shippingAddress.street}</p>
          <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
          <p>{shippingAddress.country}</p>
          <p className="mt-2 text-sm">Phone: {shippingAddress.phone}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
        </div>
        <p className="text-gray-700">{getPaymentMethodLabel(paymentMethod)}</p>
        {(paymentMethod === 'cash' || paymentMethod === 'cod') && (
          <p className="text-sm text-gray-600 mt-2">
            You will pay when your order is delivered
          </p>
        )}
      </div>

      {/* Order Total */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>Shipping</span>
            </div>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
          <div className="pt-2 border-t border-gray-200">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button type="button" variant="primary" onClick={onSubmit} disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </div>

      {/* Terms */}
      <p className="text-xs text-gray-600 text-center">
        By placing your order, you agree to our terms and conditions
      </p>
    </div>
  )
}

export default OrderSummary
