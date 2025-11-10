import User from '../models/User.js'
import { generateToken } from '../middlewares/auth.js'

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      },
      message: 'User registered successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      })
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      },
      message: 'Login successful'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.phone = req.body.phone || user.phone
      if (req.body.address) {
        user.address = { ...user.address, ...req.body.address }
      }

      const updatedUser = await user.save()

      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully'
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
  } catch (error) {
    next(error)
  }
}

// @desc    Get all users (admin)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query

    const query = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }
    if (role) query.role = role

    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const count = await User.countDocuments(query)

    res.json({
      success: true,
      data: users,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get user by ID (admin)
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update user (admin)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.phone = req.body.phone || user.phone
    user.role = req.body.role || user.role
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive
    if (req.body.address) {
      user.address = { ...user.address, ...req.body.address }
    }

    const updatedUser = await user.save()

    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Prevent deleting yourself
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      })
    }

    await user.deleteOne()

    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
