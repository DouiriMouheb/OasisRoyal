import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts, fetchFeaturedProducts } from '../store/slices/productsSlice'
import { fetchCategories } from '../store/slices/categoriesSlice'
import { ShoppingBag, Truck, Shield, Award, ArrowRight } from 'lucide-react'
import ProductGrid from '../components/products/ProductGrid'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'

export default function Home() {
  const dispatch = useDispatch()
  const { featuredProducts, loading } = useSelector((state) => state.products)
  const { categories } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
    dispatch(fetchCategories())
  }, [dispatch])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Premium Tunisian Dates
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover the finest selection of authentic dates from Tunisia. 
              Sweet, natural, and delivered fresh to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" variant="primary" icon={<ShoppingBag className="w-5 h-5" />}>
                  Shop Now
                </Button>
              </Link>
              <Link to="/shop?featured=true">
                <Button size="lg" variant="outline" icon={<Award className="w-5 h-5" />}>
                  View Featured
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Carefully selected dates from the finest Tunisian orchards
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Truck className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Free shipping on orders over 100 TND
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                100% secure transactions with multiple payment options
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Our handpicked selection of premium dates</p>
            </div>
            <Link to="/shop?featured=true">
              <Button variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
                View All
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" text="Loading featured products..." />
            </div>
          ) : (
            <ProductGrid products={featuredProducts} columns={4} />
          )}
        </div>
      </section>

      {/* Categories Section */}
      {categories && categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
              <p className="text-gray-600">Explore our wide range of date varieties</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/shop?category=${category._id}`}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to experience authentic Tunisian dates?
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Start shopping today and get free shipping on orders over 100 TND
          </p>
          <Link to="/shop">
            <Button size="lg" variant="outline" className="bg-white text-amber-600 hover:bg-gray-100 border-white">
              Browse All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
