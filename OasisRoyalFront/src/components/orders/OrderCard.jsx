import { Link } from 'react-router-dom'
import { Package, Calendar, DollarSign, MapPin, ChevronRight } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { formatDate } from '../../utils/formatDate'
import Badge from '../common/Badge'

const OrderCard = ({ order }) => {
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

  return (
    <Link
      to={`/orders/${order._id}`}
      className="block bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Package className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-900">Order #{order._id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(order.createdAt)}
          </div>
        </div>
        <Badge variant={getStatusVariant(order.status)}>
          {getStatusText(order.status)}
        </Badge>
      </div>

      {/* Products Preview */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          {order.items.slice(0, 3).map((item, index) => {
            // Handle both image formats: string or object with url property
            const firstImage = item.product?.images?.[0]
            const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url
            
            return (
              <div
                key={index}
                className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 border border-gray-200"
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.product?.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
            )
          })}
          {order.items.length > 3 && (
            <div className="w-16 h-16 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                +{order.items.length - 3}
              </span>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600">
          {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      {/* Order Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Total
          </span>
          <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
        </div>
        
        {order.shippingAddress && (
          <div className="flex items-start text-sm">
            <MapPin className="w-4 h-4 mr-1 text-gray-600 mt-0.5" />
            <span className="text-gray-600 flex-1">
              {order.shippingAddress.city}, {order.shippingAddress.country}
            </span>
          </div>
        )}
      </div>

      {/* View Details Link */}
      <div className="flex items-center justify-end text-blue-600 text-sm font-medium pt-4 border-t border-gray-200">
        View Details
        <ChevronRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  )
}

export default OrderCard
