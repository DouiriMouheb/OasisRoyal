import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Heart } from 'lucide-react'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { IMAGE_PLACEHOLDER } from '../../utils/constants'

const ProductCard = ({ product }) => {
  const { add, isInCart, getItemQuantity } = useCart()
  const inCart = isInCart(product._id)
  const quantity = getItemQuantity(product._id)
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    add(product)
  }
  
  const imageUrl = product.images?.[0]?.url || IMAGE_PLACEHOLDER
  const isOutOfStock = product.stock === 0
  
  return (
    <Link to={`/product/${product._id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="danger" size="sm">
                Out of Stock
              </Badge>
            )}
            {inCart && (
              <Badge variant="success" size="sm">
                In Cart ({quantity})
              </Badge>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Add to Wishlist"
            >
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Quick View"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {product.category.name}
            </p>
          )}
          
          {/* Name */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          
          {/* Price & Stock */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
            {!isOutOfStock && (
              <span className="text-sm text-gray-500">
                {product.stock} in stock
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            fullWidth
            variant="primary"
            icon={<ShoppingCart className="w-4 h-4" />}
          >
            {isOutOfStock ? 'Out of Stock' : inCart ? 'Add More' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
