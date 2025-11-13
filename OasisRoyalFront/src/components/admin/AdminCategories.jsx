import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { fetchCategories } from '../../store/slices/categoriesSlice'
import { deleteCategory, clearSuccessMessage, clearError } from '../../store/slices/adminSlice'
import Loader from '../common/Loader'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import toast from 'react-hot-toast'

const AdminCategories = () => {
  const dispatch = useDispatch()
  const { items: categories, loading: categoriesLoading } = useSelector(state => state.categories)
  const { loading, error, successMessage } = useSelector(state => state.admin)
  
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearSuccessMessage())
      dispatch(fetchCategories()) // Refresh list
    }
  }, [successMessage, dispatch])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleDelete = (categoryId, categoryName) => {
    if (window.confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) {
      dispatch(deleteCategory(categoryId))
    }
  }
  
  if (categoriesLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-gray-600 mt-1">Organize your products by categories</p>
        </div>
        <Link to="/admin/categories/create">
          <Button variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Category
          </Button>
        </Link>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Total Categories</p>
            <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Active Categories</p>
            <p className="text-2xl font-bold text-green-600">
              {categories.filter(c => c.isActive).length}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-gray-600">Inactive Categories</p>
            <p className="text-2xl font-bold text-red-600">
              {categories.filter(c => !c.isActive).length}
            </p>
          </Card.Body>
        </Card>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category._id}>
            <div className="relative">
              {category.image?.url ? (
                <img
                  src={category.image.url}
                  alt={category.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
              <Badge 
                variant={category.isActive ? 'success' : 'error'} 
                className="absolute top-2 right-2"
              >
                {category.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <Card.Body>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Slug: {category.slug}</p>
              {category.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
              )}
              
              <div className="flex items-center space-x-2 mt-4">
                <Link to={`/admin/categories/${category._id}/edit`} className="flex-1">
                  <Button variant="outline" fullWidth>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="error"
                  onClick={() => handleDelete(category._id, category.name)}
                  loading={loading}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      {categories.length === 0 && (
        <Card>
          <Card.Body className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
            <Link to="/admin/categories/create">
              <Button variant="primary" className="mt-4">
                <Plus className="w-5 h-5 mr-2" />
                Add Your First Category
              </Button>
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}

export default AdminCategories
