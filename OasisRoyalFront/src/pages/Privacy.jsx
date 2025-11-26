import { Shield, Lock, Eye, Users, Database, FileText, Mail, AlertCircle } from 'lucide-react'
import Card from '../components/common/Card'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: November 26, 2025</p>
          <p className="text-gray-600 mt-2">
            This Privacy Policy explains how we collect, use, and protect your information when you visit or make a purchase from our website.
          </p>
        </div>

        <div className="space-y-6">
          {/* Information We Collect */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Database className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                  
                  {/* Personal Information */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">a. Personal Information</h3>
                    <p className="text-gray-700 mb-2">When you make a purchase or create an account, we may collect:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Full name</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Email address</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Phone number</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Shipping and billing address</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Payment information (processed securely by third-party providers)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Non-Personal Information */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">b. Non-Personal Information</h3>
                    <p className="text-gray-700 mb-2">We automatically collect:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">IP address</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Browser type</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Device information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Pages visited</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">Cookies and usage data</span>
                      </li>
                    </ul>
                  </div>

                  {/* Payment Data */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">c. Payment Data</h3>
                    <p className="text-gray-700">
                      We do not store your full credit card details. All payments are securely processed through trusted payment providers such as Stripe, PayPal, or your chosen gateway.
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* How We Use Your Information */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Eye className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                  <p className="text-gray-700 mb-3">We use your information to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Process and deliver your orders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Provide customer support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Contact you about your order status</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Improve our website and user experience</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Send promotional emails (only with your consent)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Prevent fraudulent transactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Cookies */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">3. Cookies</h2>
                  <p className="text-gray-700 mb-3">We use cookies to:</p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Enable website functionality</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Remember your cart items</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Analyze website traffic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Improve performance</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">
                    You can disable cookies from your browser settings, but some features may not work properly.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Sharing Your Information */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">4. Sharing Your Information</h2>
                  <p className="text-gray-700 font-semibold mb-3">We do not sell your data.</p>
                  <p className="text-gray-700 mb-2">We may share your information with:</p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Shipping carriers (e.g., DHL, Poste Italiane)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Payment processors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Analytics tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Legal authorities, if required by law</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 italic">
                    All partners follow strict privacy and security rules.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Data Protection & Security */}
          <Card className="border-green-200 bg-green-50">
            <Card.Body>
              <div className="flex items-start">
                <Lock className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">5. Data Protection & Security</h2>
                  <p className="text-gray-700 mb-3">
                    We use industry-standard security measures to protect your information, including:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Lock className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">SSL encryption</span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Secure servers</span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Limited data access</span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Regular security monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Your Rights */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                  <p className="text-gray-700 mb-3">Depending on your location, you may have the right to:</p>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Access your personal data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Correct inaccurate information</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Request deletion of your data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Object to marketing communications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Export your data (data portability)</span>
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    To exercise these rights, contact us through our <a href="/contact" className="text-amber-600 hover:text-amber-700 font-semibold">contact page</a>.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Data Retention */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <Database className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">7. Data Retention</h2>
                  <p className="text-gray-700 mb-2">We retain your data only as long as necessary to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Provide our services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Comply with legal obligations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Resolve disputes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">Maintain accounting records</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Third-Party Links */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">8. Third-Party Links</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <Card.Body>
              <div className="flex items-start">
                <FileText className="w-6 h-6 text-amber-600 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">9. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </p>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0">
            <Card.Body>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-white mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
                  <p className="text-amber-50 mb-4">
                    If you have questions about this Privacy Policy or want to make a request, contact us:
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-white text-amber-600 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Privacy
