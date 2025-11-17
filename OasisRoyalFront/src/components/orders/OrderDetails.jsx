import { Package, MapPin, CreditCard, Calendar, Truck, CheckCircle } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { formatDate } from '../../utils/formatDate'
import Badge from '../common/Badge'
import Card from '../common/Card'

const OrderDetails = ({ order }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'processing':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const orderSteps = [
    { key: 'pending', label: 'Order Placed', icon: Package },
    { key: 'processing', label: 'Processing', icon: CreditCard },
    { key: 'shipped', label: 'Shipped', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ]

  const getStepStatus = (stepKey) => {
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered']
    const currentIndex = statusOrder.indexOf(order.status)
    const stepIndex = statusOrder.indexOf(stepKey)
    
    if (order.status === 'cancelled') return 'cancelled'
    if (stepIndex < currentIndex) return 'completed'
    if (stepIndex === currentIndex) return 'current'
    return 'upcoming'
  }

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order #{order._id.slice(-8).toUpperCase()}
              </h2>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Placed on {formatDate(order.createdAt)}</span>
              </div>
            </div>
            <Badge variant={getStatusVariant(order.status)} size="lg">
              {getStatusText(order.status)}
            </Badge>
          </div>

          {/* Order Progress */}
          {order.status !== 'cancelled' && (
            <div className="mt-8">
              <div className="flex justify-between">
                {orderSteps.map((step, index) => {
                  const status = getStepStatus(step.key)
                  const Icon = step.icon
                  
                  return (
                    <div key={step.key} className="flex-1 relative">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            status === 'completed'
                              ? 'bg-green-500 text-white'
                              : status === 'current'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-xs text-center ${
                            status === 'completed' || status === 'current'
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      
                      {index < orderSteps.length - 1 && (
                        <div
                          className={`absolute top-6 left-1/2 w-full h-0.5 ${
                            status === 'completed' ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                          style={{ transform: 'translateY(-50%)' }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Order Items */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                  {item.product?.images?.[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product?.name || 'Product'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.product?.name || 'Product'}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatPrice(item.price)}</p>
                  <p className="text-sm text-gray-600">each</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Order Summary and Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Shipping Address
            </h3>
            {order.shippingAddress ? (
              <div className="text-gray-700 space-y-1">
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            ) : (
              <p className="text-gray-500">No shipping address provided</p>
            )}
          </div>
        </Card>

        {/* Order Summary */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Payment Method: <span className="font-medium">{order.paymentMethod || 'Cash on Delivery'}</span>
                </p>
                {order.isPaid && (
                  <p className="text-sm text-green-600 mt-1">
                    ✓ Paid on {formatDate(order.paidAt)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tracking Number */}
      {order.trackingNumber && (
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Tracking Information
            </h3>
            <p className="text-gray-700">
              Tracking Number: <span className="font-mono font-semibold">{order.trackingNumber}</span>
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}

export default OrderDetails
