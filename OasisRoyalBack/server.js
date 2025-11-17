import dotenv from 'dotenv'
// Load env vars FIRST before any other imports
dotenv.config()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import connectDB from './config/db.js'
import swaggerSpec from './config/swagger.js'
import passport from './config/passport.js'
import logger from './utils/logger.js'
import errorHandler from './middlewares/errorHandler.js'

// Routes
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cartRoutes from './routes/cartRoutes.js'

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Security middleware
app.use(helmet())

// CORS configuration - allows multiple origins
const allowedOrigins = [
  // Development URLs
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  
  // Production URLs from .env (supports comma-separated list)
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) : []),
  
  // Add more URLs as needed:
  // 'https://yourdomain.com',
  // 'https://www.yourdomain.com',
  // 'https://admin.yourdomain.com',
].filter(Boolean) // Remove undefined values

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Initialize Passport
app.use(passport.initialize())

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 */
// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Oasis Royal API is running' })
})

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Pong response
 */
app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong' })
})

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Oasis Royal API Docs',
  customCss: '.swagger-ui .topbar { display: none }'
}))

// API Routes
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)

// Error handler (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`)
  process.exit(1)
})
