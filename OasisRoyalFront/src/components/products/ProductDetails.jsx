import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProductById } from '../../store/slices/productsSlice'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import { ShoppingCart, Heart, Minus, Plus, Package, Truck, Shield } from 'lucide-react'
import Button from '../common/Button'
import Badge from '../common/Badge'
import Loader from '../common/Loader'
import Alert from '../common/Alert'
import { IMAGE_PLACEHOLDER, SHIPPING_COST } from '../../utils/constants'

const ProductDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct: product, loading, error } = useSelector(state => state.products)
  const { add, getItemQuantity } = useCart()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const cartQuantity = getItemQuantity(id)
  const isOutOfStock = product?.stock === 0
  const availableStock = product ? product.stock - cartQuantity : 0
  
  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])
  
  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= availableStock) {
      add(product, quantity)
      setQuantity(1) // Reset quantity after adding
    }
  }
  
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= availableStock) {
      setQuantity(newQuantity)
    }
  }
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Loader size="lg" text="Loading product details..." fullScreen />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Alert type="error" title="Error" message={error} />
        <div className="mt-6">
          <Link to="/shop">
            <Button variant="outline">Back to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  if (!product) {
    return null
  }
  
  const images = product.images?.length > 0
    ? product.images
    : [{ url: IMAGE_PLACEHOLDER, alt: product.name }]
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-amber-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-amber-600">Shop</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link to={`/shop?category=${product.category._id}`} className="hover:text-amber-600">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>
      
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div>
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={images[selectedImage]?.url}
              alt={images[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-amber-600' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt || `${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div>
          {/* Category & Featured Badge */}
          <div className="flex items-center gap-2 mb-2">
            {product.category && (
              <Badge variant="default">{product.category.name}</Badge>
            )}
            {product.featured && (
              <Badge variant="warning">Featured</Badge>
            )}
          </div>
          
          {/* Name */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
          </div>
          
          {/* Stock Status */}
          <div className="mb-6">
            {isOutOfStock ? (
              <Badge variant="danger" size="lg">Out of Stock</Badge>
            ) : availableStock <= 5 ? (
              <Badge variant="warning" size="lg">Only {availableStock} left in stock!</Badge>
            ) : (
              <Badge variant="success" size="lg">In Stock ({availableStock} available)</Badge>
            )}
            {cartQuantity > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                You have {cartQuantity} in your cart
              </p>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          {/* Quantity Selector */}
          {!isOutOfStock && (
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={availableStock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-x border-gray-300 py-3 focus:outline-none"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= availableStock}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Max: {availableStock}
                </span>
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              variant="primary"
              size="lg"
              icon={<ShoppingCart className="w-5 h-5" />}
              className="flex-1"
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={<Heart className="w-5 h-5" />}
            >
            </Button>
          </div>
          
          {/* Features */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Premium Quality</p>
                <p className="text-sm text-gray-600">Carefully selected Tunisia dates</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Fast Delivery</p>
                <p className="text-sm text-gray-600">
                  Shipping: {formatPrice(SHIPPING_COST)} | Free over {formatPrice(100)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
