import express from 'express'
import { uploadImage } from '../controllers/uploadController.js'
import { upload } from '../config/cloudinary.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage)

export default router
