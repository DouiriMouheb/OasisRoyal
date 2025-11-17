import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../../store/slices/authSlice'
import Button from '../common/Button'
import Alert from '../common/Alert'
import api from '../../store/api'

const ProfileImageUpload = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const fileInputRef = useRef(null)

  const [preview, setPreview] = useState(user?.avatar || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload image
    handleUpload(file)
  }

  const handleUpload = async (file) => {
    setUploading(true)
    setError('')
    setSuccessMessage('')

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('image', file)

      // Upload to cloudinary via our upload endpoint
      const uploadResponse = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      // Get the uploaded image URL from response
      // Backend returns { success, data: { url, publicId }, message }
      const imageUrl = uploadResponse.data.url

      // Update user profile with new avatar
      await dispatch(updateUserProfile({ avatar: imageUrl })).unwrap()

      setSuccessMessage('Profile picture updated successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      console.error('Upload error:', err)
      setError(err.response?.data?.message || 'Failed to upload image')
      // Reset preview on error
      setPreview(user?.avatar || null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    try {
      setUploading(true)
      setError('')
      
      // Update user profile to remove avatar
      await dispatch(updateUserProfile({ avatar: '' })).unwrap()
      
      setPreview(null)
      setSuccessMessage('Profile picture removed successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setError('Failed to remove image')
    } finally {
      setUploading(false)
    }
  }

  const getInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert variant="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <div className="flex items-center space-x-6">
        {/* Avatar Preview */}
        <div className="relative">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-200">
              <span className="text-white text-3xl font-bold">{getInitials()}</span>
            </div>
          )}
          
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Profile Picture</h3>
          <p className="text-sm text-gray-600 mb-4">
            JPG, PNG or GIF. Max size 5MB.
          </p>
          
          <div className="flex space-x-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              variant="primary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </Button>

            {preview && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileImageUpload
