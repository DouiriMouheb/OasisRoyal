import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CategoryForm from '../../components/admin/CategoryForm'
import Loader from '../../components/common/Loader'

const AdminCategoryCreatePage = () => {
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
      <CategoryForm />
    </div>
  )
}

export default AdminCategoryCreatePage
