import { useSelector } from 'react-redux'
import { formatPrice } from '../../utils/formatPrice'
import { Truck } from 'lucide-react'
import { FREE_SHIPPING_THRESHOLD } from '../../utils/constants'

const CartSummary = ({ showDetails = true }) => {
  const { subtotal, shipping, tax, total, items } = useSelector(state => state.cart)
  
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const amountUntilFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      {/* Free Shipping Progress */}
      {!isFreeShipping && showDetails && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-800 font-medium">
              {amountUntilFreeShipping > 0
                ? `Add ${formatPrice(amountUntilFreeShipping)} more for FREE shipping!`
                : 'You qualify for FREE shipping!'}
            </p>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Summary Details */}
      <div className="space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          <span className="font-semibold">{formatPrice(subtotal)}</span>
        </div>
        
        {showDetails && (
          <>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold">
                {isFreeShipping ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            
            <div className="flex justify-between text-gray-700">
              <span>Tax (10%)</span>
              <span className="font-semibold">{formatPrice(tax)}</span>
            </div>
            
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-amber-600">{formatPrice(total)}</span>
              </div>
            </div>
          </>
        )}
        
        {!showDetails && (
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Subtotal</span>
              <span className="text-amber-600">{formatPrice(subtotal)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSummary
