import Product from '../models/Product.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, featured, search, sort = '-createdAt', page = 1, limit = 12 } = req.query

    const query = { isActive: true }

    if (category) query.category = category
    if (featured) query.featured = true
    if (search) query.$text = { $search: search }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const count = await Product.countDocuments(query)

    res.json({
      success: true,
      data: products,
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

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}
