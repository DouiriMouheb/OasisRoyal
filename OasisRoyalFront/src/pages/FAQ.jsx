import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import Card from '../components/common/Card'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Orders & Payments',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and cash on delivery for eligible regions.'
        },
        {
          question: 'Can I change or cancel my order?',
          answer: 'Orders can be canceled within 2 hours of purchase. After that, the order may already be processed or shipped. Please contact us immediately if you need to make changes.'
        },
        {
          question: 'How do I track my order?',
          answer: 'Once your order is shipped, you will receive a confirmation email with a tracking number. You can also track your order by logging into your account and viewing your order history.'
        },
        {
          question: 'Do you offer international shipping?',
          answer: 'Yes, we ship worldwide! Delivery times vary based on location: 2-4 business days for domestic (Italy), 4-7 days for Europe, and 7-14 days for international orders.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We accept returns within 14 days of delivery. Items must be unopened, unused, in original packaging, and in the same condition you received them. Check our Returns page for full details.'
        },
        {
          question: 'How long does it take to get a refund?',
          answer: 'Once we receive and inspect your return, refunds are processed within 3-7 business days to your original payment method.'
        },
        {
          question: 'Who pays for return shipping?',
          answer: 'Customers are responsible for return shipping costs unless the item is defective or incorrect. We recommend using a trackable shipping service.'
        },
        {
          question: 'Can I exchange an item?',
          answer: 'Yes! If you received a damaged, defective, or incorrect item, we will gladly replace it at no additional cost. Contact us within 48 hours with photos and your order number.'
        }
      ]
    },
    {
      category: 'Products',
      questions: [
        {
          question: 'Are your products authentic?',
          answer: 'Yes, all our products are 100% authentic and sourced directly from authorized distributors and manufacturers.'
        },
        {
          question: 'How do I know what size to order?',
          answer: 'Each product page includes detailed size charts and measurements. If you\'re unsure, feel free to contact our customer support for personalized assistance.'
        },
        {
          question: 'Do you restock sold-out items?',
          answer: 'We regularly restock popular items. Sign up for product notifications or check back on our website for updates on availability.'
        },
        {
          question: 'Can I pre-order items?',
          answer: 'Pre-orders are available for select products. Pre-order items will be clearly marked, and you\'ll receive an estimated delivery date at checkout.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Login" in the top menu, then select "Register". You can also sign up using your Google or Facebook account for quick registration.'
        },
        {
          question: 'I forgot my password. What should I do?',
          answer: 'Click on "Forgot Password" on the login page. Enter your email address, and we\'ll send you instructions to reset your password.'
        },
        {
          question: 'Is my personal information secure?',
          answer: 'Yes! We use SSL encryption and industry-standard security measures to protect your data. We never sell your information to third parties. Read our Privacy Policy for more details.'
        },
        {
          question: 'How do I update my account information?',
          answer: 'Log into your account and go to "Profile" to update your personal information, address, and contact details.'
        }
      ]
    },
    {
      category: 'Shipping',
      questions: [
        {
          question: 'How much does shipping cost?',
          answer: 'Shipping fees are calculated at checkout based on your destination and the total weight of your order.'
        },
        {
          question: 'What if my package is lost or damaged?',
          answer: 'If your package is lost or arrives damaged, contact us within 48 hours with your order number and photos. We\'ll investigate and assist you as quickly as possible.'
        },
        {
          question: 'Can I change my shipping address after ordering?',
          answer: 'Contact us immediately if you need to change your shipping address. If the order hasn\'t been shipped yet, we can update it for you.'
        },
        {
          question: 'Do you charge customs fees?',
          answer: 'International customers are responsible for any customs duties, taxes, or import fees charged by their country. We cannot control or predict these charges.'
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our products and services</p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`
                  const isOpen = openIndex === index

                  return (
                    <Card key={questionIndex} className="overflow-hidden">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full text-left"
                      >
                        <Card.Body className="hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900 pr-8 flex-1">
                              {faq.question}
                            </h3>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                            )}
                          </div>
                        </Card.Body>
                      </button>
                      {isOpen && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          <Card.Body>
                            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          </Card.Body>
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 mt-12">
          <Card.Body>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-3">Still have questions?</h2>
              <p className="text-amber-50 mb-4">
                Can't find the answer you're looking for? Our support team is here to help.
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
  )
}

export default FAQ
