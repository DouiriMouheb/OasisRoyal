import { Award, Heart, Leaf, Users } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-amber-100 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Oasis Royal
            </h1>
            <p className="text-xl text-gray-700">
              Your trusted source for premium Tunisian dates since our founding
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Oasis Royal was born from a passion for bringing the finest Tunisian dates to customers around the world. 
                Our journey began in the heart of Tunisia's date-producing regions, where we discovered the incredible 
                quality and variety of dates that this beautiful country has to offer.
              </p>
              <p className="mb-4">
                We work directly with local farmers and cooperatives, ensuring that every date we sell meets our 
                strict quality standards while supporting sustainable farming practices. Our commitment to excellence 
                means that you receive only the freshest, most delicious dates available.
              </p>
              <p>
                Today, Oasis Royal continues to grow, but our mission remains the same: to share the natural sweetness 
                and health benefits of premium Tunisian dates with families everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every date is carefully selected and inspected to ensure premium standards.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Leaf className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We support eco-friendly farming practices and work with farmers committed to environmental stewardship.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                We believe in fair trade and building lasting relationships with our farming partners and customers.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Care</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're dedicated to providing excellent service and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Oasis Royal?</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-semibold mb-2">Direct from Source</h3>
                <p className="text-gray-600">
                  We work directly with Tunisian farmers, cutting out middlemen to bring you the freshest dates at the best prices.
                </p>
              </div>
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-semibold mb-2">Variety & Quality</h3>
                <p className="text-gray-600">
                  From Deglet Nour to Medjool, we offer a wide selection of premium date varieties, each with its unique flavor profile.
                </p>
              </div>
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-semibold mb-2">Health & Nutrition</h3>
                <p className="text-gray-600">
                  Our dates are 100% natural, packed with nutrients, and free from artificial additives or preservatives.
                </p>
              </div>
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  We stand behind our products with a satisfaction guarantee and responsive customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Oasis Royal Difference
          </h2>
          <p className="text-xl mb-8 text-amber-100">
            Discover why thousands of customers trust us for their premium date needs
          </p>
          <a
            href="/shop"
            className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </div>
  )
}
