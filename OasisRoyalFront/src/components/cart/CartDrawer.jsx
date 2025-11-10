import { X, ShoppingBag, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Button from '../common/Button'
import { useEffect } from 'react'

const CartDrawer = ({ isOpen, onClose }) => {
  const { items } = useSelector(state => state.cart)
  const { clear } = useCart()
  
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2" />
            Shopping Cart
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-6">
                Add some delicious dates to get started!
              </p>
              <Button onClick={onClose} variant="primary">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer - Summary & Actions */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            <CartSummary showDetails={false} />
            
            <div className="space-y-2">
              <Link to="/cart" onClick={onClose}>
                <Button variant="outline" fullWidth>
                  View Cart
                </Button>
              </Link>
              <Link to="/checkout" onClick={onClose}>
                <Button
                  variant="primary"
                  fullWidth
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clear()
                }
              }}
              className="w-full text-sm text-red-600 hover:text-red-700 underline"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
