import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import Badge from '../common/Badge'
import { IMAGE_PLACEHOLDER } from '../../utils/constants'

const CartItem = ({ item }) => {
  const { increment, decrement, remove } = useCart()
  const { product, quantity } = item
  
  const imageUrl = product.images?.[0] || IMAGE_PLACEHOLDER
  const isLowStock = product.stock <= 5
  const isOutOfStock = product.stock === 0
  const maxQuantity = product.stock
  
  const itemTotal = product.price * quantity
  
  return (
    <div className="flex gap-4 bg-white rounded-lg p-3 border border-gray-200">
      {/* Image */}
      <Link
        to={`/product/${product._id}`}
        className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform"
        />
      </Link>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Name & Remove */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            to={`/product/${product._id}`}
            className="font-semibold text-gray-900 hover:text-amber-600 line-clamp-2 text-sm"
          >
            {product.name}
          </Link>
          <button
            onClick={() => remove(product._id)}
            className="text-red-600 hover:text-red-700 p-1"
            title="Remove from cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        {/* Stock Status */}
        {isOutOfStock ? (
          <Badge variant="danger" size="sm" className="mb-2">
            Out of Stock
          </Badge>
        ) : isLowStock ? (
          <Badge variant="warning" size="sm" className="mb-2">
            Only {product.stock} left
          </Badge>
        ) : null}
        
        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => decrement(product._id)}
              disabled={quantity <= 1}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => increment(product._id)}
              disabled={quantity >= maxQuantity}
              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-amber-600">
              {formatPrice(itemTotal)}
            </div>
            <div className="text-xs text-gray-500">
              {formatPrice(product.price)} each
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
