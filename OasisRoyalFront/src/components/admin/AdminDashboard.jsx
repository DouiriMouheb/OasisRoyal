import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
  Users, Package, ShoppingBag, DollarSign, 
  TrendingUp
} from 'lucide-react'
import { fetchDashboardStats } from '../../store/slices/adminSlice'
import Loader from '../common/Loader'
import Card from '../common/Card'
import Badge from '../common/Badge'
import { formatPrice } from '../../utils/formatPrice'
import { formatDate } from '../../utils/formatDate'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { stats, statsLoading, error } = useSelector(state => state.admin)
  
  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, [dispatch])
  
  if (statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader size="lg" />
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading dashboard: {error}
      </div>
    )
  }
  
  if (!stats) return null
  
  const { overview, recentOrders, topProducts, ordersByStatus, salesTrend } = stats
  
  const statCards = [
    {
      title: 'Total Revenue',
      value: formatPrice(overview.totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/admin/orders'
    },
    {
      title: 'Total Orders',
      value: overview.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/admin/orders'
    },
    {
      title: 'Total Products',
      value: overview.totalProducts,
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/admin/products'
    },
    {
      title: 'Total Users',
      value: overview.totalUsers,
      icon: Users,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      link: '/admin/users'
    }
  ]
  
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error'
    }
    return colors[status] || 'default'
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening</p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link to={stat.link} key={index}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Card.Body className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </Card.Body>
              </Card>
            </Link>
          )
        })}
      </div>
      
      {/* Average Order Value */}
      <Card>
        <Card.Body>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {formatPrice(overview.avgOrderValue)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card.Body>
      </Card>
      
      {/* Orders by Status */}
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold">Orders by Status</h2>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ordersByStatus.map((item) => (
              <div key={item._id} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                <Badge variant={getStatusColor(item._id)} className="mt-2">
                  {item._id}
                </Badge>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <Card.Header className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-amber-600 hover:text-amber-700 text-sm">
              View All
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">
                        <Link to={`/admin/orders/${order._id}`} className="text-amber-600 hover:underline">
                          #{order._id.slice(-8)}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm">{order.user?.name}</td>
                      <td className="px-4 py-3 text-sm font-medium">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant={getStatusColor(order.status)}>{order.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
        
        {/* Top Products */}
        <Card>
          <Card.Header className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Top Products</h2>
            <Link to="/admin/products" className="text-amber-600 hover:text-amber-700 text-sm">
              View All
            </Link>
          </Card.Header>
          <Card.Body className="space-y-4">
            {topProducts.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.product.images?.[0] && (
                    <img 
                      src={item.product.images[0].url} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">{item.totalSold} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatPrice(item.revenue)}</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Revenue
                  </p>
                </div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
      
      {/* Sales Trend */}
      <Card>
        <Card.Header>
          <h2 className="text-xl font-semibold">Sales Trend (Last 7 Days)</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-3">
            {salesTrend.map((day) => (
              <div key={day._id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(day._id).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-sm text-gray-600">{day.orders} orders</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full transition-all"
                      style={{ width: `${(day.revenue / Math.max(...salesTrend.map(d => d.revenue))) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-semibold text-gray-900 min-w-[80px] text-right">
                  {formatPrice(day.revenue)}
                </span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AdminDashboard
