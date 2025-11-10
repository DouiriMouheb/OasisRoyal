import express from 'express'
import {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserStatus
} from '../controllers/adminController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(protect, authorize('admin'))

router.get('/stats', getDashboardStats)

router.get('/users', getAllUsers)
router.put('/users/:id/role', updateUserRole)
router.put('/users/:id/status', toggleUserStatus)

export default router
