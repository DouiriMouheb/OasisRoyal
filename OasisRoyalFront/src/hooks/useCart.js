import { useSelector, useDispatch } from 'react-redux'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../store/slices/cartSlice'
import toast from 'react-hot-toast'

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  
  const add = (product) => {
    dispatch(addToCart(product))
    toast.success(`${product.name} added to cart`)
  }
  
  const remove = (productId) => {
    dispatch(removeFromCart(productId))
    toast.success('Item removed from cart')
  }
  
  const update = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }))
  }
  
  const increment = (productId) => {
    dispatch(incrementQuantity(productId))
  }
  
  const decrement = (productId) => {
    dispatch(decrementQuantity(productId))
  }
  
  const clear = () => {
    dispatch(clearCart())
    toast.success('Cart cleared')
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
    add,
    remove,
    update,
    increment,
    decrement,
    clear,
    getItemQuantity,
    isInCart
  }
}
