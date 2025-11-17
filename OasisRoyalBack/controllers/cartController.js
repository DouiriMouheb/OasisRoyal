import Cart from '../models/Cart.js'
import Product from '../models/Product.js'

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price images stock')

    if (!cart) {
      // Create empty cart if doesn't exist
      cart = await Cart.create({ user: req.user._id, items: [] })
    }

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
        itemCount: cart.getItemCount()
      }
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body

    // Verify product exists and has stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      })
    }

    // Get or create cart
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] })
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      if (newQuantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock'
        })
      }
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity,
        price: product.price
      })
    }

    await cart.save()
    await cart.populate('items.product', 'name price images stock')

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
        itemCount: cart.getItemCount()
      },
      message: 'Item added to cart'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      })
    }

    // Verify product and stock
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      })
    }

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      })
    }

    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    )

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()
    await cart.populate('items.product', 'name price images stock')

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
        itemCount: cart.getItemCount()
      },
      message: 'Cart updated'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      })
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    )

    await cart.save()
    await cart.populate('items.product', 'name price images stock')

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
        itemCount: cart.getItemCount()
      },
      message: 'Item removed from cart'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      })
    }

    cart.items = []
    await cart.save()

    res.json({
      success: true,
      data: {
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0
      },
      message: 'Cart cleared'
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Sync cart (merge localStorage cart with database cart)
// @route   POST /api/cart/sync
// @access  Private
export const syncCart = async (req, res, next) => {
  try {
    const { items: localItems } = req.body

    // Get or create user's cart
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] })
    }

    // Merge local items with database cart
    if (localItems && localItems.length > 0) {
      for (const localItem of localItems) {
        const productId = localItem.product._id
        const product = await Product.findById(productId)

        if (!product) continue // Skip if product no longer exists

        const existingItemIndex = cart.items.findIndex(
          item => item.product.toString() === productId
        )

        if (existingItemIndex > -1) {
          // Update quantity (take the maximum)
          const newQuantity = Math.max(
            cart.items[existingItemIndex].quantity,
            localItem.quantity
          )
          // Don't exceed stock
          cart.items[existingItemIndex].quantity = Math.min(newQuantity, product.stock)
          cart.items[existingItemIndex].price = product.price // Update price
        } else {
          // Add new item
          cart.items.push({
            product: productId,
            quantity: Math.min(localItem.quantity, product.stock),
            price: product.price
          })
        }
      }

      await cart.save()
    }

    await cart.populate('items.product', 'name price images stock')

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal: cart.subtotal,
        tax: cart.tax,
        shipping: cart.shipping,
        total: cart.total,
        itemCount: cart.getItemCount()
      },
      message: 'Cart synced successfully'
    })
  } catch (error) {
    next(error)
  }
}
