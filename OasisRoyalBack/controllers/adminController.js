import Order from '../models/Order.js'
import Product from '../models/Product.js'
import User from '../models/User.js'

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    // Total counts
    const totalOrders = await Order.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalUsers = await User.countDocuments({ role: 'user' })

    // Revenue stats
    const revenueStats = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$total' },
          avgOrderValue: { $avg: '$total' }
        }
      }
    ])

    // Recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .limit(5)

    // Top products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' }
    ])

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    // Sales trend (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const salesTrend = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          isPaid: true
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          revenue: { $sum: '$total' }
        }
      },
      { $sort: { _id: 1 } }
    ])

    res.json({
      success: true,
      data: {
        overview: {
          totalOrders,
          totalProducts,
          totalUsers,
          totalRevenue: revenueStats[0]?.totalRevenue || 0,
          avgOrderValue: revenueStats[0]?.avgOrderValue || 0
        },
        recentOrders,
        topProducts,
        ordersByStatus,
        salesTrend
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get all users (admin view)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt')

    res.json({
      success: true,
      data: users
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user,
      message: 'User role updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({
      success: true,
      data: user,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`
    })
  } catch (error) {
    next(error)
  }
}
