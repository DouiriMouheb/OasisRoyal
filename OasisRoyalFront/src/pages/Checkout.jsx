import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../store/slices/ordersSlice'
import { useCart } from '../hooks/useCart'
import toast from 'react-hot-toast'
import CheckoutSteps from '../components/checkout/CheckoutSteps'
import ShippingForm from '../components/checkout/ShippingForm'
import PaymentMethod from '../components/checkout/PaymentMethod'
import OrderSummary from '../components/checkout/OrderSummary'
import Alert from '../components/common/Alert'
import { ShoppingBag } from 'lucide-react'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { items, total } = useSelector((state) => state.cart)
  const { loading, error } = useSelector((state) => state.orders)
  const { clear } = useCart()

  const [currentStep, setCurrentStep] = useState(1)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [orderError, setOrderError] = useState(null)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && currentStep === 1) {
      navigate('/shop')
    }
  }, [items, currentStep, navigate])

  const handleShippingSubmit = (address) => {
    setShippingAddress(address)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = (method) => {
    setPaymentMethod(method)
    setCurrentStep(3)
  }

  const handlePlaceOrder = async () => {
    try {
      setOrderError(null)

      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          ...shippingAddress,
          name: user?.name || 'Customer'
        },
        paymentMethod: paymentMethod === 'cod' ? 'cash' : paymentMethod,
        subtotal: total,
        tax: 0, // Calculate based on your tax logic
        shippingCost: 0, // Calculate based on shipping logic
        total: total
      }

      // Create order
      await dispatch(createOrder(orderData)).unwrap()
      
      // Clear cart after successful order (without toast)
      await clear(false)
      
      // Show success message
      toast.success('Order placed successfully!')
      
      // Navigate to orders page after a short delay to ensure cart is cleared
      setTimeout(() => {
        navigate('/orders')
      }, 100)
      
    } catch (err) {
      setOrderError(err.message || 'Failed to place order. Please try again.')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const steps = ['Shipping', 'Payment', 'Review', 'Complete']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ShoppingBag className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          </div>
          <CheckoutSteps steps={steps} currentStep={currentStep} />
        </div>

        {/* Error Alert */}
        {(orderError || error) && (
          <div className="mb-6">
            <Alert variant="error" onClose={() => setOrderError(null)}>
              {orderError || error}
            </Alert>
          </div>
        )}

        {/* Checkout Forms */}
        <div className="mb-8">
          {currentStep === 1 && (
            <ShippingForm
              initialData={user?.address}
              onSubmit={handleShippingSubmit}
            />
          )}

          {currentStep === 2 && (
            <PaymentMethod
              onSubmit={handlePaymentSubmit}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <OrderSummary
              shippingAddress={shippingAddress}
              paymentMethod={paymentMethod}
              onSubmit={handlePlaceOrder}
              onBack={handleBack}
              loading={loading}
            />
          )}
        </div>

        {/* Cart Summary Sidebar */}
        {currentStep < 3 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-700">
                <span>Items ({items.length})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout
