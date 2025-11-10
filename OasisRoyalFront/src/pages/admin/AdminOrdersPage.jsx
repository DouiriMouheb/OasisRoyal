import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminOrders from '../../components/admin/AdminOrders'
import Loader from '../../components/common/Loader'

const AdminOrdersPage = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else if (user?.role !== 'admin') {
      navigate('/')
    }
  }, [isAuthenticated, user, navigate])
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Loader />
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AdminOrders />
    </div>
  )
}

export default AdminOrdersPage
