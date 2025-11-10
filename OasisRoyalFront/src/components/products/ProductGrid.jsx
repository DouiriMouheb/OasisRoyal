import ProductCard from './ProductCard'
import Loader from '../common/Loader'
import Alert from '../common/Alert'

const ProductGrid = ({ products, loading, error, columns = 4 }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader size="lg" text="Loading products..." />
      </div>
    )
  }
  
  if (error) {
    return (
      <Alert
        type="error"
        title="Error Loading Products"
        message={error}
      />
    )
  }
  
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">No products found</p>
        <p className="text-gray-400">Try adjusting your filters or search query</p>
      </div>
    )
  }
  
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }
  
  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
