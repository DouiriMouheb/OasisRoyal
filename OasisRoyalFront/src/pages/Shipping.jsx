import { Package, Clock, Truck, Globe, AlertCircle, MapPin } from 'lucide-react'
import Card from '../components/common/Card'

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Package className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600">Everything you need to know about our shipping policies</p>
        </div>

        <div className="space-y-6">
          {/* Processing Time */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Processing Time</h2>
                  <p className="text-gray-700 leading-relaxed">
                    All orders are processed within <strong>1–2 business days</strong>. Orders placed on weekends or holidays will be processed on the next business day.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Shipping Methods */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Truck className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Shipping Methods & Delivery Times</h2>
                  <p className="text-gray-700 mb-4">
                    We offer reliable worldwide shipping through trusted carriers. Estimated delivery times:
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">
                        <strong>Domestic (Within Italy):</strong> 2–4 business days
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">
                        <strong>Europe:</strong> 4–7 business days
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">
                        <strong>International:</strong> 7–14 business days
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">
                    Delivery times may vary based on location, customs clearance, and carrier delays.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Shipping Costs */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Shipping Costs</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Shipping fees are calculated at checkout based on your destination and the total weight of your order.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Order Tracking */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Order Tracking</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Once your order is shipped, you will receive a confirmation email with a tracking number to follow your package in real time.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Important Information */}
          <Card className="border-amber-200 bg-amber-50">
            <Card.Body>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Information</h2>
                  
                  <div className="space-y-4">
                    {/* Customs & Import Fees */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Customs & Import Fees</h3>
                      <p className="text-gray-700 leading-relaxed">
                        International customers are responsible for any customs duties, taxes, or import fees charged by their country. We cannot control or predict these charges.
                      </p>
                    </div>

                    {/* Damaged or Missing Packages */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Damaged or Missing Packages</h3>
                      <p className="text-gray-700 leading-relaxed">
                        If your package arrives damaged or does not arrive at all, please contact us within <strong>48 hours</strong> with your order number and photos (if applicable). We will investigate and assist you as quickly as possible.
                      </p>
                    </div>

                    {/* Wrong Address Disclaimer */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Wrong Address Disclaimer</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Please make sure your shipping address is correct at checkout. We are not responsible for delays or lost parcels due to an incorrect or incomplete address.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
            <Card.Body>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-3">Questions?</h2>
                <p className="text-amber-50 mb-4">
                  If you have any questions about shipping, feel free to contact our support team.
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

export default Shipping
