import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, clearFilters } from '../../store/slices/productsSlice'
import { Filter, X } from 'lucide-react'
import Button from '../common/Button'

const ProductFilters = ({ categories = [] }) => {
  const dispatch = useDispatch()
  const { filters } = useSelector(state => state.products)
  const { loading: categoriesLoading } = useSelector(state => state.categories)
  const [showFilters, setShowFilters] = useState(true)
  
  const handleCategoryChange = (categoryId) => {
    dispatch(setFilters({ category: categoryId }))
  }
  
  const handleFeaturedChange = (e) => {
    dispatch(setFilters({ featured: e.target.checked }))
  }
  
  const handleClearFilters = () => {
    dispatch(clearFilters())
  }
  
  const hasActiveFilters = filters.category || filters.featured
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden text-gray-600"
        >
          {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Filter Content */}
      <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Categories */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={!filters.category}
                onChange={() => handleCategoryChange('')}
                className="mr-2 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-gray-700">All Categories</span>
            </label>
            
            {categoriesLoading ? (
              <p className="text-sm text-gray-500 italic">Loading categories...</p>
            ) : categories && categories.length > 0 ? (
              categories.map(category => (
                <label key={category._id} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === category._id}
                    onChange={() => handleCategoryChange(category._id)}
                    className="mr-2 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No categories available</p>
            )}
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-medium text-gray-900 mb-3">Special</h4>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={filters.featured}
              onChange={handleFeaturedChange}
              className="mr-2 text-amber-600 focus:ring-amber-500 rounded"
            />
            <span className="text-gray-700">Featured Products Only</span>
          </label>
        </div>
        
        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="border-t border-gray-200 pt-6">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              fullWidth
              icon={<X className="w-4 h-4" />}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductFilters
