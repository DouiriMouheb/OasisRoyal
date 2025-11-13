import { Link } from 'react-router-dom'
import { User, Menu, X, Search, Shield, Users, ShoppingBag, Package, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import CartButton from '../cart/CartButton'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logout())
  }
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-amber-600">Oasis Royal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-amber-600 transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
         
            
            {/* Cart */}
            <CartButton />
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-amber-600 transition-colors">
                  {user?.role === 'admin' ? (
                    <Shield className="w-6 h-6 text-amber-600" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {user?.role === 'admin' ? (
                    // Admin Menu
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 bg-amber-50">
                        <p className="text-xs font-semibold text-amber-600 uppercase">Admin Panel</p>
                      </div>
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/users"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Users className="w-4 h-4" />
                        <span>Manage Users</span>
                      </Link>
                      <Link
                        to="/admin/products"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Package className="w-4 h-4" />
                        <span>Manage Products</span>
                      </Link>
                      <Link
                        to="/admin/orders"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Manage Orders</span>
                      </Link>
                      <Link
                        to="/admin/categories"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-200"
                      >
                        <Menu className="w-4 h-4" />
                        <span>Manage Categories</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    // Regular User Menu
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
     
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile User Menu */}
            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                {user?.role === 'admin' ? (
                  // Admin Mobile Menu
                  <>
                    <div className="px-2 py-1 mb-2">
                      <p className="text-xs font-semibold text-amber-600 uppercase">Admin Panel</p>
                    </div>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/admin/users"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="w-4 h-4" />
                      <span>Manage Users</span>
                    </Link>
                    <Link
                      to="/admin/products"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      <span>Manage Products</span>
                    </Link>
                    <Link
                      to="/admin/orders"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Manage Orders</span>
                    </Link>
                    <Link
                      to="/admin/categories"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Menu className="w-4 h-4" />
                      <span>Manage Categories</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>
                  </>
                ) : (
                  // Regular User Mobile Menu
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block py-2 text-gray-700 hover:text-amber-600 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left py-2 text-red-600 hover:text-red-700 transition-colors mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
