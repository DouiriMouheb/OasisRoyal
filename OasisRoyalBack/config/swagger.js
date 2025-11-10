import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Oasis Royal API',
      version: '1.0.0',
      description: 'E-commerce API for premium date products - Oasis Royal',
      contact: {
        name: 'Douiri Labs',
        email: 'contact@oasisroyal.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.oasisroyal.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: { type: 'string', description: 'User ID' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
            phone: { type: 'string', example: '+212612345678' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                country: { type: 'string' }
              }
            },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Category: {
          type: 'object',
          required: ['name'],
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Premium Dates' },
            slug: { type: 'string', example: 'premium-dates' },
            description: { type: 'string', example: 'High-quality premium dates from Morocco' },
            image: {
              type: 'object',
              properties: {
                url: { type: 'string' },
                publicId: { type: 'string' }
              }
            },
            isActive: { type: 'boolean', default: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'category'],
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', example: 'Medjool Dates Premium 500g' },
            description: { type: 'string', example: 'Premium Medjool dates from Morocco' },
            price: { type: 'number', example: 29.99 },
            category: { type: 'string', description: 'Category ID' },
            images: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string' },
                  publicId: { type: 'string' }
                }
              }
            },
            stock: { type: 'number', default: 0, example: 100 },
            weight: { type: 'number', example: 500 },
            featured: { type: 'boolean', default: false },
            isActive: { type: 'boolean', default: true },
            ratings: {
              type: 'object',
              properties: {
                average: { type: 'number', default: 0 },
                count: { type: 'number', default: 0 }
              }
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Order: {
          type: 'object',
          required: ['items', 'shippingAddress', 'paymentMethod'],
          properties: {
            _id: { type: 'string' },
            user: { type: 'string', description: 'User ID' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product: { type: 'string' },
                  quantity: { type: 'number' },
                  price: { type: 'number' }
                }
              }
            },
            shippingAddress: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                street: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                country: { type: 'string' },
                phone: { type: 'string' }
              }
            },
            paymentMethod: { type: 'string', enum: ['stripe', 'paypal', 'cash'] },
            subtotal: { type: 'number' },
            shippingCost: { type: 'number' },
            tax: { type: 'number' },
            total: { type: 'number' },
            isPaid: { type: 'boolean', default: false },
            paidAt: { type: 'string', format: 'date-time' },
            isDelivered: { type: 'boolean', default: false },
            deliveredAt: { type: 'string', format: 'date-time' },
            status: {
              type: 'string',
              enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
              default: 'pending'
            },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message' }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'object' },
            message: { type: 'string' }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
}

export default swaggerJsdoc(options)
