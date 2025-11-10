import express from 'express'
import dotenv from 'dotenv'
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

// Load env vars
dotenv.config()

// Connect to database
connectDB()

const app = express()

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
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
