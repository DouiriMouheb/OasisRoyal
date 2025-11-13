import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { createCategory, updateCategory, clearSuccessMessage, clearError } from '../../store/slices/adminSlice'
import Card from '../common/Card'
import Input from '../common/Input'
import Button from '../common/Button'
import toast from 'react-hot-toast'
import api from '../../store/api'

const CategoryForm = ({ category = null }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, successMessage } = useSelector(state => state.admin)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  })
  
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  
  // Pre-fill form if editing
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        isActive: category.isActive !== undefined ? category.isActive : true
      })
      if (category.image?.url) {
        setImagePreview(category.image.url)
      }
    }
  }, [category])
  
  // Handle success/error messages
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearSuccessMessage())
      navigate('/admin/categories')
    }
  }, [successMessage, dispatch, navigate])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB')
        return
      }
      
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
  }
  
  const uploadImage = async () => {
    if (!imageFile) return null
    
    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append('image', imageFile)
      
      const response = await api.post('/upload', formData)
      
      return response.data // response is already unwrapped, so response.data has { url, publicId }
    } catch (err) {
      console.error('Upload error:', err)
      toast.error(err.response?.data?.message || 'Failed to upload image')
      return null
    } finally {
      setUploadingImage(false)
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate
    if (!formData.name.trim()) {
      toast.error('Category name is required')
      return
    }
    
    // Upload image if new one selected
    let imageData = category?.image || null
    if (imageFile) {
      const uploadedImage = await uploadImage()
      if (uploadedImage) {
        imageData = uploadedImage
      }
    } else if (!imagePreview) {
      imageData = null
    }
    
    const categoryData = {
      ...formData,
      image: imageData
    }
    
    if (category) {
      // Update existing category
      dispatch(updateCategory({ categoryId: category._id, categoryData }))
    } else {
      // Create new category
      dispatch(createCategory(categoryData))
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <Card>
        <Card.Body>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {category ? 'Edit Category' : 'Create New Category'}
          </h2>
          
          <div className="space-y-4">
            {/* Category Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Electronics, Clothing"
                required
              />
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the category"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image
              </label>
              
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label className="cursor-pointer">
                    <span className="text-amber-600 hover:text-amber-700 font-medium">
                      Upload an image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
            
            {/* Active Status */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Active (Category will be visible to customers)
              </label>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/categories')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading || uploadingImage}
            >
              {category ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </form>
  )
}

export default CategoryForm
