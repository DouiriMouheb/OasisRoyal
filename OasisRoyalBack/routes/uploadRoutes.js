import express from 'express'
import { uploadImage, uploadMultipleImages } from '../controllers/uploadController.js'
import { upload } from '../config/cloudinary.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage)
router.post('/multiple', protect, authorize('admin'), upload.array('images', 10), uploadMultipleImages)

export default router
