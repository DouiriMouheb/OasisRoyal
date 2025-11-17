import express from 'express'
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController.js'
import { upload } from '../config/cloudinary.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

// Single image upload - accessible to all authenticated users (for profile pictures)
router.post('/', protect, upload.single('image'), uploadImage)
// Multiple images upload - admin only (for product images)
router.post('/multiple', protect, authorize('admin'), upload.array('images', 10), uploadMultipleImages)

export default router
