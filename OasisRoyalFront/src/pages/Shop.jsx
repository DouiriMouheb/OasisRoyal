import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts, setFilters } from '../store/slices/productsSlice'
import { fetchCategories } from '../store/slices/categoriesSlice'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilters from '../components/products/ProductFilters'
import ProductSort from '../components/products/ProductSort'
import ProductSearch from '../components/products/ProductSearch'
import Pagination from '../components/common/Pagination'
import { Filter } from 'lucide-react'

const Shop = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  const { products, loading, error, filters, pagination } = useSelector(state => state.products)
  const { categories } = useSelector(state => state.categories)
  
  // Sync URL params with Redux filters on mount
  useEffect(() => {
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    
    if (category || search || featured) {
      dispatch(setFilters({
        category: category || '',
        search: search || '',
        featured: featured === 'true'
      }))
    }
  }, [searchParams, dispatch])
  
  // Fetch categories on mount
  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])
  
  // Fetch products when filters change
  useEffect(() => {
    dispatch(fetchProducts({
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      category: filters.category,
      sort: filters.sort,
      featured: filters.featured
    }))
  }, [dispatch, filters])
  
  const handlePageChange = (page) => {
    dispatch(setFilters({ page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Shop Premium Dates</h1>
          <p className="text-gray-600">
            Discover our collection of finest Tunisian dates
          </p>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <ProductSearch />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            
            {/* Filters */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
              <ProductFilters categories={categories} />
            </div>
          </aside>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {pagination.total > 0 ? (
                    <>
                      Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
                    </>
                  ) : (
                    'No products found'
                  )}
                </div>
                <ProductSort />
              </div>
            </div>
            
            {/* Products Grid */}
            <ProductGrid 
              products={products} 
              loading={loading} 
              error={error}
              columns={3}
            />
            
            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
