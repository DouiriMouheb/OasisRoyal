import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById } from '../../store/slices/ordersSlice'
import { updateOrderStatus, markOrderAsPaid } from '../../store/slices/adminSlice'
import Loader from '../../components/common/Loader'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import { 
  Package, 
  MapPin, 
  CreditCard, 
  Calendar, 
  User, 
  Phone, 
  Mail,
  ArrowLeft,
  CheckCircle,
  Truck
} from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { formatDate } from '../../utils/formatDate'
import toast from 'react-hot-toast'

const AdminOrderDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { currentOrder: order, loading } = useSelector(state => state.orders)
  const { loading: updating } = useSelector(state => state.admin)
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else if (user?.role !== 'admin') {
      navigate('/')
    }
  }, [isAuthenticated, user, navigate])

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (order) {
      setSelectedStatus(order.status)
    }
  }, [order])

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

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'cash':
        return 'Cash on Delivery'
      case 'paypal':
        return 'PayPal'
      case 'stripe':
        return 'Credit/Debit Card'
      default:
        return method
    }
  }

  const handleUpdateStatus = async () => {
    if (selectedStatus === order.status) {
      toast.error('Please select a different status')
      return
    }

    try {
      await dispatch(updateOrderStatus({ orderId: order._id, status: selectedStatus })).unwrap()
      toast.success('Order status updated successfully')
      dispatch(fetchOrderById(id))
    } catch (error) {
      toast.error(error || 'Failed to update order status')
    }
  }

  const handleMarkAsPaid = async () => {
    try {
      await dispatch(markOrderAsPaid(order._id)).unwrap()
      toast.success('Order marked as paid successfully')
      dispatch(fetchOrderById(id))
    } catch (error) {
      toast.error(error || 'Failed to mark order as paid')
    }
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Loader />
  }

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/orders')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Orders
          </Button>
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order #{order._id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <Badge variant={getStatusVariant(order.status)} size="lg">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Package className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                </div>
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const firstImage = item.product?.images?.[0]
                    const imageUrl = typeof firstImage === 'string' ? firstImage : firstImage?.url
                    
                    return (
                      <div key={item._id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
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
                          <p className="text-sm text-gray-600">Price: {formatPrice(item.price)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>

            {/* Customer Information */}
            <Card>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{order.user?.name || order.shippingAddress?.name}</p>
                    </div>
                  </div>
                  {order.user?.email && (
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium text-gray-900">{order.user.email}</p>
                      </div>
                    </div>
                  )}
                  {order.shippingAddress?.phone && (
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Shipping Address */}
            <Card>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
                </div>
                <div className="text-gray-700">
                  <p className="font-medium">{order.shippingAddress?.name}</p>
                  <p>{order.shippingAddress?.street}</p>
                  <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                  <p>{order.shippingAddress?.country}</p>
                  {order.shippingAddress?.phone && (
                    <p className="mt-2 text-sm">Phone: {order.shippingAddress.phone}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Status & Payment */}
          <div className="space-y-6">
            {/* Update Status */}
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Status
                    </label>
                    <Badge variant={getStatusVariant(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleUpdateStatus}
                    disabled={updating || selectedStatus === order.status}
                    icon={<CheckCircle className="w-4 h-4" />}
                  >
                    {updating ? 'Updating...' : 'Update Status'}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Payment Information */}
            <Card>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge variant={order.isPaid ? 'success' : 'warning'}>
                      {order.isPaid ? 'Paid' : 'Not Paid'}
                    </Badge>
                  </div>
                  {order.isPaid && order.paidAt && (
                    <div>
                      <p className="text-sm text-gray-600">Paid At</p>
                      <p className="text-sm text-gray-900">{formatDate(order.paidAt)}</p>
                    </div>
                  )}
                  {!order.isPaid && order.paymentMethod === 'cash' && (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={handleMarkAsPaid}
                      icon={<CheckCircle className="w-4 h-4" />}
                    >
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Order Summary */}
            <Card>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      <span>Shipping</span>
                    </div>
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
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetailPage
