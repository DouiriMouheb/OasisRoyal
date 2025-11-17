import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders } from '../store/slices/ordersSlice'
import OrderCard from '../components/orders/OrderCard'
import Loader from '../components/common/Loader'
import Alert from '../components/common/Alert'
import { Package, Filter } from 'lucide-react'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const { orders, loading, error } = useSelector((state) => state.orders)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch])

  const filteredOrders = filterStatus === 'all'
    ? (orders || []).filter(order => order && order._id)
    : (orders || []).filter(order => order && order._id && order.status === filterStatus)

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
          <p className="text-gray-600">View and track your orders</p>
        </div>

        {/* Filter */}
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {filterStatus !== 'all' && (
              <span className="text-sm text-gray-600">
                ({filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'})
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <Loader size="lg" text="Loading your orders..." />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Orders List */}
        {!loading && !error && (
          <>
            {filteredOrders.length > 0 ? (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {filterStatus === 'all'
                    ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                    : `You don't have any ${filterStatus} orders.`}
                </p>
                {filterStatus === 'all' && (
                  <a
                    href="/shop"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </a>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default OrderHistory
