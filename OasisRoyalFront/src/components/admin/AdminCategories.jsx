import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react'
import { fetchCategories } from '../../store/slices/categoriesSlice'
import { deleteCategory, clearSuccessMessage, clearError } from '../../store/slices/adminSlice'
import Loader from '../common/Loader'
import Card from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import Modal from '../common/Modal'
import toast from 'react-hot-toast'

const AdminCategories = () => {
  const dispatch = useDispatch()
  const { items: categories, loading: categoriesLoading } = useSelector(state => state.categories)
  const { loading, error, successMessage } = useSelector(state => state.admin)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearSuccessMessage())
      dispatch(fetchCategories()) // Refresh list
      setShowDeleteModal(false)
      setCategoryToDelete(null)
    }
  }, [successMessage, dispatch])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleDelete = (categoryId, categoryName) => {
    setCategoryToDelete({ id: categoryId, name: categoryName })
    setShowDeleteModal(true)
  }
  
  const confirmDelete = () => {
    if (categoryToDelete) {
      dispatch(deleteCategory(categoryToDelete.id))
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
      
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false)
          setCategoryToDelete(null)
        }}
        title="Delete Category"
        size="sm"
      >
        {categoryToDelete && (
          <div className="space-y-4">
            <p className="text-gray-700">
              Are you sure you want to delete <strong>"{categoryToDelete.name}"</strong>?
            </p>
            <p className="text-sm text-red-600">
              This action cannot be undone. All products in this category will need to be reassigned.
            </p>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false)
                  setCategoryToDelete(null)
                }}
              >
                Cancel
              </Button>
              <Button
                variant="error"
                onClick={confirmDelete}
                loading={loading}
              >
                Delete Category
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default AdminCategories
