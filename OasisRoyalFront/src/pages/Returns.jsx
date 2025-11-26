import { RotateCcw, Package, CheckCircle, XCircle, DollarSign, Clock, AlertCircle } from 'lucide-react'
import Card from '../components/common/Card'

const Returns = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <RotateCcw className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return & Exchange Policy</h1>
          <p className="text-lg text-gray-600">Easy returns and exchanges within 14 days</p>
        </div>

        <div className="space-y-6">
          {/* Returns */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Package className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Returns</h2>
                  <p className="text-gray-700 mb-4">
                    We accept returns within <strong>14 days of delivery</strong>. To be eligible for a return, items must be:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unopened</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Unused</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">In their original packaging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">In the same condition that you received them</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">
                    Certain items (such as perishable goods) may not be eligible for return. Please check product descriptions for details.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Exchanges */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <RotateCcw className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Exchanges</h2>
                  <p className="text-gray-700 mb-4">
                    If you received a damaged, defective, or incorrect item, we will gladly replace it at no additional cost.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Please contact us within <strong>48 hours</strong> of receiving your order with:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Your order number</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Photos of the damaged or wrong item</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Non-Returnable Items */}
          <Card className="border-red-200 bg-red-50">
            <Card.Body>
              <div className="flex items-start">
                <XCircle className="w-6 h-6 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Non-Returnable Items</h2>
                  <p className="text-gray-700 mb-3">
                    The following items cannot be returned or exchanged:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Perishable or food products once opened</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Items on sale or marked as "Final Sale"</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Personalized or custom-made items</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Refunds */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <DollarSign className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Refunds</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Approved refunds will be processed to your original payment method within <strong>3–7 business days</strong>.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Return Shipping Costs */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Package className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Return Shipping Costs</h2>
                  <p className="text-gray-700 mb-3 leading-relaxed">
                    Customers are responsible for return shipping costs unless the item is defective or incorrect.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We recommend using a trackable shipping service for your return.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Order Cancellations */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Order Cancellations</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Orders can be canceled within <strong>2 hours of purchase</strong>. After that, the order may already be processed or shipped.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* How to Start a Return */}
          <Card className="border-amber-200 bg-amber-50">
            <Card.Body>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">How to Start a Return</h2>
                  <p className="text-gray-700 leading-relaxed">
                    To begin a return or exchange, please contact us with your order number and reason for the return.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
            <Card.Body>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-3">Need to Return or Exchange?</h2>
                <p className="text-amber-50 mb-4">
                  Contact our support team to start your return or exchange process.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Returns
