import Order from '../models/Order.js'
import Product from '../models/Product.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      total
    } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items'
      })
    }

    // Verify product stock
    for (const item of items) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`
        })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        })
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingCost,
      tax,
      total
    })

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      })
    }

    res.status(201).json({
      success: true,
      data: order,
      message: 'Order created successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/me
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images price')
      .sort('-createdAt')

    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('items.product', 'name images price')

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Make sure user is order owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      })
    }

    res.json({
      success: true,
      data: order
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name images price')
      .sort('-createdAt')

    res.json({
      success: true,
      data: orders
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body

    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    order.status = status

    if (status === 'delivered') {
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }

    await order.save()

    res.json({
      success: true,
      data: order,
      message: 'Order status updated'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update order (admin)
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Update allowed fields
    if (req.body.shippingAddress) order.shippingAddress = req.body.shippingAddress
    if (req.body.status) order.status = req.body.status
    if (req.body.trackingNumber) order.trackingNumber = req.body.trackingNumber
    if (req.body.isPaid !== undefined) order.isPaid = req.body.isPaid
    if (req.body.paidAt) order.paidAt = req.body.paidAt
    if (req.body.isDelivered !== undefined) order.isDelivered = req.body.isDelivered
    if (req.body.deliveredAt) order.deliveredAt = req.body.deliveredAt

    const updatedOrder = await order.save()

    res.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete order (admin)
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Only allow deletion of cancelled orders or very old pending orders
    if (order.status !== 'cancelled' && order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Can only delete cancelled or pending orders'
      })
    }

    // Restore stock if deleting a pending/processing order
    if (order.status === 'pending' || order.status === 'processing') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity }
        })
      }
    }

    await order.deleteOne()

    res.json({
      success: true,
      message: 'Order deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
