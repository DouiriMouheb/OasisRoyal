import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Save, X, Plus, Trash2, Image as ImageIcon, Upload } from 'lucide-react'
import {
  createProduct,
  updateProduct,
  clearSuccessMessage,
  clearError
} from '../../store/slices/adminSlice'
import { fetchProductById } from '../../store/slices/productsSlice'
import { fetchCategories } from '../../store/slices/categoriesSlice'
import Input from '../common/Input'
import Button from '../common/Button'
import Card from '../common/Card'
import Loader from '../common/Loader'
import toast from 'react-hot-toast'
import api from '../../store/api'

const productSchema = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  category: yup.string().required('Category is required'),
  stock: yup.number().min(0, 'Stock cannot be negative').required('Stock is required'),
  weight: yup.number().positive('Weight must be positive').optional(),
  featured: yup.boolean(),
  isActive: yup.boolean()
}).required()

const ProductForm = ({ mode = 'create' }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, successMessage } = useSelector(state => state.admin)
  const { selectedProduct, loading: productLoading } = useSelector(state => state.products)
  const { items: categories = [] } = useSelector(state => state.categories)
  
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [uploadingImages, setUploadingImages] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      weight: 0,
      featured: false,
      isActive: true
    }
  })
  
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  useEffect(() => {
    if (mode === 'edit' && id) {
      dispatch(fetchProductById(id))
    }
  }, [mode, id, dispatch])
  
  useEffect(() => {
    if (mode === 'edit' && selectedProduct) {
      setValue('name', selectedProduct.name)
      setValue('description', selectedProduct.description)
      setValue('price', selectedProduct.price)
      setValue('category', selectedProduct.category?._id || selectedProduct.category)
      setValue('stock', selectedProduct.stock)
      setValue('weight', selectedProduct.weight || 0)
      setValue('featured', selectedProduct.featured || false)
      setValue('isActive', selectedProduct.isActive !== false)
      
      if (selectedProduct.images && selectedProduct.images.length > 0) {
        setImages(selectedProduct.images)
      }
    }
  }, [selectedProduct, mode, setValue])
  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(clearSuccessMessage())
      navigate('/admin/products')
    }
  }, [successMessage, dispatch, navigate])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])
  
  const handleImageFilesChange = (e) => {
    const files = Array.from(e.target.files)
    
    if (files.length === 0) return
    
    // Validate file sizes
    const maxSize = 5 * 1024 * 1024 // 5MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Max size is 5MB`)
        return false
      }
      return true
    })
    
    if (validFiles.length === 0) return
    
    // Add files to state
    setImageFiles(prev => [...prev, ...validFiles])
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, { url: reader.result, isNew: true }])
      }
      reader.readAsDataURL(file)
    })
  }
  
  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImageFiles(prev => prev.filter((_, i) => i !== index))
  }
  
  const uploadImages = async () => {
    if (imageFiles.length === 0) return []
    
    try {
      setUploadingImages(true)
      const formData = new FormData()
      imageFiles.forEach(file => {
        formData.append('images', file)
      })
      
      const response = await api.post('/upload/multiple', formData)
      
      return response.data // response is already unwrapped, so response.data has array of { url, publicId }
    } catch (err) {
      console.error('Upload error:', err)
      toast.error(err.response?.data?.message || 'Failed to upload images')
      return []
    } finally {
      setUploadingImages(false)
    }
  }
  
  const onSubmit = async (data) => {
    // Upload new images if any
    const uploadedImages = await uploadImages()
    
    // Combine existing images (not new) with newly uploaded ones
    const existingImages = images.filter(img => !img.isNew)
    const allImages = [...existingImages, ...uploadedImages]
    
    if (allImages.length === 0) {
      toast.error('Please add at least one product image')
      return
    }
    
    const productData = {
      ...data,
      images: allImages
    }
    
    if (mode === 'edit' && id) {
      dispatch(updateProduct({ productId: id, productData }))
    } else {
      dispatch(createProduct(productData))
    }
  }
  
  const handleAddImage = () => {
    document.getElementById('image-upload-input').click()
  }
  
  if (mode === 'edit' && productLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Product' : 'Create New Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            {mode === 'edit' ? 'Update product information' : 'Add a new product to your catalog'}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/admin/products')}
        >
          <X className="w-5 h-5 mr-2" />
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </Card.Header>
          <Card.Body className="space-y-4">
            <Input
              label="Product Name"
              placeholder="Enter product name"
              error={errors.name?.message}
              {...register('name')}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Enter product description"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Price (TND)"
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.price?.message}
                {...register('price')}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  {...register('category')}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories && categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No categories available</option>
                  )}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Stock"
                type="number"
                placeholder="0"
                error={errors.stock?.message}
                {...register('stock')}
              />
              
              <Input
                label="Weight (kg)"
                type="number"
                step="0.01"
                placeholder="0.00"
                error={errors.weight?.message}
                {...register('weight')}
              />
            </div>
          </Card.Body>
        </Card>
        
        {/* Images */}
        <Card>
          <Card.Header className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product Images</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddImage}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Images
            </Button>
          </Card.Header>
          <Card.Body>
            <input
              id="image-upload-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageFilesChange}
              className="hidden"
            />
            
            {images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square border-2 border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-amber-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Main Image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No images added yet</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddImage}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Images
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  JPG, PNG or WEBP (max 5MB per image)
                </p>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {/* Settings */}
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold">Settings</h2>
          </Card.Header>
          <Card.Body className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('featured')}
                className="mr-3 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">Featured Product</span>
                <p className="text-sm text-gray-600">
                  Display this product in the featured section
                </p>
              </div>
            </label>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                {...register('isActive')}
                className="mr-3 rounded text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="font-medium text-gray-900">Active</span>
                <p className="text-sm text-gray-600">
                  Make this product visible to customers
                </p>
              </div>
            </label>
          </Card.Body>
        </Card>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/products')}
            disabled={loading || uploadingImages}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading || uploadingImages}
          >
            <Save className="w-5 h-5 mr-2" />
            {uploadingImages ? 'Uploading Images...' : mode === 'edit' ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
