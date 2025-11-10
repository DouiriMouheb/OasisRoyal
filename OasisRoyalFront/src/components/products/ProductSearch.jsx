import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Search, X } from 'lucide-react'
import { setFilters } from '../../store/slices/productsSlice'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'

const ProductSearch = ({ onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const initialSearch = searchParams.get('search') || ''
  
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const debouncedSearch = useDebounce(searchTerm, 500)
  
  useEffect(() => {
    if (debouncedSearch !== initialSearch) {
      // Update Redux state
      dispatch(setFilters({ search: debouncedSearch }))
      
      // Update URL if on shop page or navigate to shop
      const currentPath = window.location.pathname
      if (currentPath === '/shop') {
        const params = new URLSearchParams(window.location.search)
        if (debouncedSearch) {
          params.set('search', debouncedSearch)
        } else {
          params.delete('search')
        }
        navigate(`/shop?${params.toString()}`, { replace: true })
      } else if (debouncedSearch) {
        navigate(`/shop?search=${debouncedSearch}`)
      }
    }
  }, [debouncedSearch, dispatch, navigate, initialSearch])
  
  const handleClear = () => {
    setSearchTerm('')
    dispatch(setFilters({ search: '' }))
    if (onClose) onClose()
  }
  
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for premium dates..."
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          autoFocus
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Search suggestions could go here */}
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-50">
          <p className="text-sm text-gray-600">
            Searching for "{searchTerm}"...
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductSearch
