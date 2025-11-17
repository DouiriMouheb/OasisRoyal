import { useSelector, useDispatch } from 'react-redux'
import {
  addToCart as addToCartLocal,
  removeFromCart as removeFromCartLocal,
  updateQuantity as updateQuantityLocal,
  incrementQuantity as incrementQuantityLocal,
  decrementQuantity as decrementQuantityLocal,
  clearCart as clearCartLocal,
  addToCartAsync,
  removeFromCartAsync,
  updateCartItemAsync,
  clearCartAsync,
  fetchCart,
  syncCartAsync
} from '../store/slices/cartSlice'
import toast from 'react-hot-toast'

export const useCart = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const cart = useSelector(state => state.cart)
  
  const add = async (product) => {
    try {
      if (isAuthenticated) {
        await dispatch(addToCartAsync({ productId: product._id, quantity: 1 })).unwrap()
      } else {
        dispatch(addToCartLocal(product))
      }
      toast.success(`${product.name} added to cart`)
    } catch (error) {
      toast.error(error || 'Failed to add item to cart')
    }
  }
  
  const remove = async (productId) => {
    try {
      if (isAuthenticated) {
        await dispatch(removeFromCartAsync(productId)).unwrap()
      } else {
        dispatch(removeFromCartLocal(productId))
      }
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error(error || 'Failed to remove item')
    }
  }
  
  const update = async (productId, quantity) => {
    try {
      if (isAuthenticated) {
        await dispatch(updateCartItemAsync({ productId, quantity })).unwrap()
      } else {
        dispatch(updateQuantityLocal({ productId, quantity }))
      }
    } catch (error) {
      toast.error(error || 'Failed to update quantity')
    }
  }
  
  const increment = async (productId) => {
    try {
      if (isAuthenticated) {
        const item = cart.items.find(item => item.product._id === productId)
        if (item) {
          await dispatch(updateCartItemAsync({ productId, quantity: item.quantity + 1 })).unwrap()
        }
      } else {
        dispatch(incrementQuantityLocal(productId))
      }
    } catch (error) {
      toast.error(error || 'Failed to update quantity')
    }
  }
  
  const decrement = async (productId) => {
    try {
      if (isAuthenticated) {
        const item = cart.items.find(item => item.product._id === productId)
        if (item && item.quantity > 1) {
          await dispatch(updateCartItemAsync({ productId, quantity: item.quantity - 1 })).unwrap()
        }
      } else {
        dispatch(decrementQuantityLocal(productId))
      }
    } catch (error) {
      toast.error(error || 'Failed to update quantity')
    }
  }
  
  const clear = async (showToast = true) => {
    try {
      if (isAuthenticated) {
        await dispatch(clearCartAsync()).unwrap()
      } else {
        dispatch(clearCartLocal())
      }
      if (showToast) {
        toast.success('Cart cleared')
      }
    } catch (error) {
      toast.error(error || 'Failed to clear cart')
    }
  }

  const loadCart = async () => {
    if (isAuthenticated) {
      try {
        await dispatch(fetchCart()).unwrap()
      } catch (error) {
        console.error('Failed to load cart:', error)
      }
    }
  }

  const syncCart = async (localCart) => {
    if (isAuthenticated) {
      try {
        await dispatch(syncCartAsync(localCart)).unwrap()
      } catch (error) {
        console.error('Failed to sync cart:', error)
      }
    }
  }
  
  const getItemQuantity = (productId) => {
    const item = cart.items.find(item => item.product._id === productId)
    return item ? item.quantity : 0
  }
  
  const isInCart = (productId) => {
    return cart.items.some(item => item.product._id === productId)
  }
  
  return {
    items: cart.items,
    subtotal: cart.subtotal,
    shipping: cart.shipping,
    tax: cart.tax,
    total: cart.total,
    itemCount: cart.itemCount,
    loading: cart.loading,
    error: cart.error,
    add,
    remove,
    update,
    increment,
    decrement,
    clear,
    loadCart,
    syncCart,
    getItemQuantity,
    isInCart
  }
}
