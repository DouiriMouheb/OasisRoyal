import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderById, clearCurrentOrder } from '../store/slices/ordersSlice'
import OrderDetails from '../components/orders/OrderDetails'
import Loader from '../components/common/Loader'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import { ArrowLeft } from 'lucide-react'

const OrderDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentOrder, loading, error } = useSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrderById(id))

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentOrder())
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <Loader size="lg" text="Loading order details..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/orders')} icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!currentOrder) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/orders"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Link>
        </div>

        {/* Order Details */}
        <OrderDetails order={currentOrder} />
      </div>
    </div>
  )
}

export default OrderDetailsPage
