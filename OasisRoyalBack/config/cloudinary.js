import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

console.log('Cloudinary Config:')
console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME)
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY)
console.log('API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'NOT SET')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads'
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer storage configuration - save to local disk first
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)
  
  if (extname && mimetype) {
    cb(null, true)
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, webp) are allowed!'), false)
  }
}

export const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

export default cloudinary
