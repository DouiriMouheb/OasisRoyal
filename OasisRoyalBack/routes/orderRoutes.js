import express from 'express'
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js'
import { protect, authorize } from '../middlewares/auth.js'

const router = express.Router()

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - shippingAddress
 *               - paymentMethod
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               shippingAddress:
 *                 type: object
 *               paymentMethod:
 *                 type: string
 *               subtotal:
 *                 type: number
 *               shippingCost:
 *                 type: number
 *               tax:
 *                 type: number
 *               total:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order created
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders - Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.route('/')
  .post(protect, createOrder)
  .get(protect, authorize('admin'), getAllOrders)

/**
 * @swagger
 * /api/orders/me:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's orders
 */
router.get('/me', protect, getMyOrders)

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update order (Admin only)
 *     tags: [Orders - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *               status:
 *                 type: string
 *               trackingNumber:
 *                 type: string
 *               isPaid:
 *                 type: boolean
 *               isDelivered:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Order updated
 *   delete:
 *     summary: Delete order (Admin only)
 *     tags: [Orders - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *       400:
 *         description: Can only delete cancelled/pending orders
 */
router.route('/:id')
  .get(protect, getOrder)
  .put(protect, authorize('admin'), updateOrder)
  .delete(protect, authorize('admin'), deleteOrder)

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders - Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus)

export default router
