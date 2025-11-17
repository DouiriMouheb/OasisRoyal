import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from './store/slices/cartSlice'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'
import OrderHistory from './pages/OrderHistory'
import OrderDetailsPage from './pages/OrderDetailsPage'
import Checkout from './pages/Checkout'
import AuthCallback from './components/auth/AuthCallback'
import AuthGuard from './components/auth/AuthGuard'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminProductCreatePage from './pages/admin/AdminProductCreatePage'
import AdminProductEditPage from './pages/admin/AdminProductEditPage'
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage'
import AdminCategoryCreatePage from './pages/admin/AdminCategoryCreatePage'
import AdminCategoryEditPage from './pages/admin/AdminCategoryEditPage'

export default function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart())
    }
  }, [isAuthenticated, dispatch])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/product/:id/edit" element={<AdminProductEditPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AuthGuard><UserProfile /></AuthGuard>} />
          <Route path="/orders" element={<AuthGuard><OrderHistory /></AuthGuard>} />
          <Route path="/orders/:id" element={<AuthGuard><OrderDetailsPage /></AuthGuard>} />
          <Route path="/checkout" element={<AuthGuard><Checkout /></AuthGuard>} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/products/create" element={<AdminProductCreatePage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/categories/create" element={<AdminCategoryCreatePage />} />
          <Route path="/admin/categories/:id/edit" element={<AdminCategoryEditPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
