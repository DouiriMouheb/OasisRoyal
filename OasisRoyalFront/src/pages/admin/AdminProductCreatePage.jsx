import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductForm from '../../components/admin/ProductForm'

const AdminProductCreatePage = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)
  
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (user.role !== 'admin') {
      navigate('/')
    }
  }, [user, navigate])
  
  if (!user || user.role !== 'admin') {
    return null
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductForm mode="create" />
    </div>
  )
}

export default AdminProductCreatePage
