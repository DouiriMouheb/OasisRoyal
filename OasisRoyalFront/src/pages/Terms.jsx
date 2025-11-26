import { FileText, AlertCircle, Scale, ShoppingCart, Ban, Info } from 'lucide-react'
import Card from '../components/common/Card'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: November 26, 2025</p>
          <p className="text-gray-600 mt-2">
            Please read these terms and conditions carefully before using our website and services.
          </p>
        </div>

        <div className="space-y-6">
          {/* Acceptance of Terms */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms & Conditions, please do not use our website.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the site after changes are posted constitutes your acceptance of the modified terms.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Use of Website */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Info className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. Use of Website</h2>
                  <p className="text-gray-700 mb-3">You agree to use this website only for lawful purposes. You must not:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Use the site in any way that violates local, national, or international law</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Transmit any harmful code, viruses, or malicious software</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Attempt to gain unauthorized access to our systems or networks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Reproduce, duplicate, or copy material from our site without permission</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Use automated systems or software to extract data from the website</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Product Information & Availability */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <ShoppingCart className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Product Information & Availability</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We make every effort to display product colors, images, and descriptions as accurately as possible. However, we cannot guarantee that your device's display will accurately reflect the actual product colors.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    All products are subject to availability. We reserve the right to discontinue any product at any time without prior notice.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Prices are subject to change without notice. The price charged will be the price displayed at the time of order placement.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Orders & Payment */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Orders & Payment</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By placing an order, you are offering to purchase a product subject to these Terms & Conditions. All orders are subject to acceptance and availability.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We reserve the right to refuse or cancel any order for any reason, including but not limited to:
                  </p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Product unavailability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Pricing or product description errors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Suspected fraudulent activity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Incomplete or incorrect information provided</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Payment must be received in full before we dispatch your order. We accept various payment methods as displayed at checkout.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Shipping & Delivery */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <ShoppingCart className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Shipping & Delivery</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Delivery times are estimates and are not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or circumstances beyond our control.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    You are responsible for providing accurate shipping information. We are not liable for orders shipped to incorrect addresses provided by the customer.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Risk of loss and title for products pass to you upon delivery to the shipping carrier. For more details, see our <a href="/shipping" className="text-amber-600 hover:text-amber-700 font-semibold">Shipping Policy</a>.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Returns & Refunds */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Ban className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Returns & Refunds</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    We accept returns within 14 days of delivery, subject to our return policy conditions. Items must be unopened, unused, and in their original packaging.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Refunds will be processed to the original payment method within 3-7 business days after we receive and inspect the returned item. For complete details, see our <a href="/returns" className="text-amber-600 hover:text-amber-700 font-semibold">Return Policy</a>.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    All content on this website, including text, graphics, logos, images, and software, is the property of Oasis Royal or its content suppliers and is protected by international copyright and trademark laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You may not reproduce, distribute, modify, or create derivative works from any content on this site without our express written permission.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Limitation of Liability */}
          <Card className="border-amber-200 bg-amber-50">
            <Card.Body>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our total liability to you for any claim arising from your use of the website or purchase of products shall not exceed the amount you paid for the products.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Privacy */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your use of our website is also governed by our Privacy Policy. Please review our <a href="/privacy" className="text-amber-600 hover:text-amber-700 font-semibold">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Governing Law */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Scale className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    These Terms & Conditions shall be governed by and construed in accordance with the laws of Italy, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Any disputes arising from these terms or your use of the website shall be subject to the exclusive jurisdiction of the courts of Italy.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Severability */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">11. Severability</h2>
                  <p className="text-gray-700 leading-relaxed">
                    If any provision of these Terms & Conditions is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
            <Card.Body>
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-3">Questions About Our Terms?</h2>
                <p className="text-amber-50 mb-4">
                  If you have any questions about these Terms & Conditions, please contact us.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Terms
