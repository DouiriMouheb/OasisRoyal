import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { fetchProducts } from '../../store/slices/productsSlice'
import { deleteProduct, clearSuccessMessage, clearError } from '../../store/slices/adminSlice'
import Loader from '../common/Loader'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import toast from 'react-hot-toast'
import { formatPrice } from '../../utils/formatPrice'

const AdminProducts = () => {
  const dispatch = useDispatch()
  const { products, loading: productsLoading } = useSelector(state => state.products)
  const { loading, error, successMessage } = useSelector(state => state.admin)
  
  useEffect(() => {
    dispatch(fetchProducts({}))
  }, [dispatch])
  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearSuccessMessage())
      dispatch(fetchProducts({})) // Refresh list
    }
  }, [successMessage, dispatch])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}"?`)) {
      dispatch(deleteProduct(productId))
    }
  }
  
  if (productsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader size="lg" />
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Link to="/admin/products/create">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Active Products</p>
            <p className="text-2xl font-bold text-green-600">
              {products.filter(p => p.isActive).length}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Featured Products</p>
            <p className="text-2xl font-bold text-amber-600">
              {products.filter(p => p.featured).length}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">
              {products.filter(p => p.stock === 0).length}
            </p>
          </Card.Body>
        </Card>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id}>
            <div className="relative">
              {product.images?.[0] && (
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              {product.featured && (
                <Badge variant="warning" className="absolute top-2 right-2">
                  Featured
                </Badge>
              )}
            </div>
            <Card.Body>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-amber-600">
                  {formatPrice(product.price)}
                </span>
                <Badge variant={product.stock > 0 ? 'success' : 'error'}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link to={`/product/${product._id}/edit`} className="flex-1">
                  <Button variant="outline" fullWidth>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="error"
                  onClick={() => handleDelete(product._id, product.name)}
                  loading={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      {products.length === 0 && (
        <Card>
          <Card.Body className="text-center py-12">
            <p className="text-gray-500">No products found</p>
            <Link to="/admin/products/create">
              <Button variant="primary" className="mt-4">
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default AdminProducts
