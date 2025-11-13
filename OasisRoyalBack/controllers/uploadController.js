import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

// Ensure cloudinary is configured (backup configuration)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res, next) => {
  try {
    console.log('Single file upload - File received:', req.file)
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      folder: 'OasisRoyal/products',
      transformation: [
        { width: 800, height: 800, crop: 'limit', quality: 'auto' }
      ]
    })

    // Delete local file after successful upload
    fs.unlinkSync(req.file.path)

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id
      },
      message: 'Image uploaded successfully'
    })
  } catch (error) {
    console.error('Upload error:', error)
    // Delete local file if upload fails
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path)
      } catch (err) {
        console.error('Error deleting file:', err)
      }
    }
    next(error)
  }
}

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res, next) => {
  try {
    console.log('=== UPLOAD MULTIPLE STARTED ===')
    console.log('ENV Check:')
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME)
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY)
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET')
    
    console.log('Files received:', req.files)
    console.log('Files count:', req.files?.length)
    console.log('Body:', req.body)
    
    if (!req.files || req.files.length === 0) {
      console.log('No files received!')
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      })
    }

    console.log('Starting Cloudinary uploads...')
    const uploadPromises = req.files.map((file, index) => {
      console.log(`Uploading file ${index + 1}:`, file.path)
      return cloudinary.uploader.upload(file.path, {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        folder: 'OasisRoyal/products',
        transformation: [
          { width: 800, height: 800, crop: 'limit', quality: 'auto' }
        ]
      })
    })

    const results = await Promise.all(uploadPromises)
    console.log('Cloudinary upload successful, results count:', results.length)

    // Delete all local files after successful upload
    req.files.forEach((file, index) => {
      try {
        console.log(`Deleting local file ${index + 1}:`, file.path)
        fs.unlinkSync(file.path)
      } catch (err) {
        console.error('Error deleting file:', err)
      }
    })

    const images = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id
    }))

    console.log('Sending response with images:', images.length)
    res.json({
      success: true,
      data: images,
      message: `${images.length} image(s) uploaded successfully`
    })
  } catch (error) {
    console.error('=== UPLOAD ERROR ===')
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    // Delete all local files if upload fails
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path)
        } catch (err) {
          console.error('Error deleting file:', err)
        }
      })
    }
    next(error)
  }
}
