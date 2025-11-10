import { useDispatch, useSelector } from 'react-redux'
import { setFilters } from '../../store/slices/productsSlice'
import { ArrowUpDown } from 'lucide-react'
import { SORT_OPTIONS } from '../../utils/constants'

const ProductSort = () => {
  const dispatch = useDispatch()
  const { filters } = useSelector(state => state.products)
  
  const handleSortChange = (e) => {
    dispatch(setFilters({ sort: e.target.value }))
  }
  
  return (
    <div className="flex items-center gap-3">
      <ArrowUpDown className="w-5 h-5 text-gray-600" />
      <select
        value={filters.sort}
        onChange={handleSortChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductSort
