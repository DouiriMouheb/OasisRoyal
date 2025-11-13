import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategoryById } from '../../store/slices/categoriesSlice'
import CategoryForm from '../../components/admin/CategoryForm'
import Loader from '../../components/common/Loader'
import toast from 'react-hot-toast'

const AdminCategoryEditPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const { currentCategory, loading, error } = useSelector(state => state.categories)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    } else if (user?.role !== 'admin') {
      navigate('/')
    }
  }, [isAuthenticated, user, navigate])
  
  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryById(id))
    }
  }, [id, dispatch])
  
  useEffect(() => {
    if (error) {
      toast.error(error)
      navigate('/admin/categories')
    }
  }, [error, navigate])
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Loader />
  }
  
  if (loading || !currentCategory) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryForm category={currentCategory} />
    </div>
  )
}

export default AdminCategoryEditPage
