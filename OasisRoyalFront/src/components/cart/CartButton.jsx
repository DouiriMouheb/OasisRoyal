import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useSelector } from 'react-redux'
import CartDrawer from './CartDrawer'

const CartButton = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { items, total } = useSelector(state => state.cart)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  
  return (
    <>
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
      
      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}

export default CartButton
