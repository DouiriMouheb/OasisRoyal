import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/User.js'
import Category from './models/Category.js'
import Product from './models/Product.js'
import Order from './models/Order.js'
import logger from './utils/logger.js'

dotenv.config()

const categories = [
  {
    name: 'Premium Dates',
    description: 'High-quality premium dates from Morocco and Tunisia',
    image: {
      url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400',
      publicId: 'premium-dates'
    }
  },
  {
    name: 'Gift Boxes',
    description: 'Beautifully packaged date gift boxes for special occasions',
    image: {
      url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
      publicId: 'gift-boxes'
    }
  },
  {
    name: 'Date Derivatives',
    description: 'Date paste, syrup, and other date-based products',
    image: {
      url: 'https://images.unsplash.com/photo-1587496679742-bad502958fbf?w=400',
      publicId: 'date-derivatives'
    }
  },
  {
    name: 'Organic Dates',
    description: 'Certified organic dates grown without pesticides',
    image: {
      url: 'https://images.unsplash.com/photo-1577003833154-a2f3f17c4cd2?w=400',
      publicId: 'organic-dates'
    }
  }
]

const users = [
  {
    name: 'Admin User',
    email: 'admin@oasisroyal.com',
    password: 'admin123',
    role: 'admin',
    phone: '+212612345678',
    address: {
      street: '123 Admin Street',
      city: 'Casablanca',
      postalCode: '20000',
      country: 'Morocco'
    }
  },
  {
    name: 'Test Customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'user',
    phone: '+212698765432',
    address: {
      street: '456 Customer Avenue',
      city: 'Rabat',
      postalCode: '10000',
      country: 'Morocco'
    }
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    logger.info('MongoDB Connected')

    // Clear existing data
    await User.deleteMany()
    await Category.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    logger.info('Cleared existing data')

    // Create users
    const createdUsers = await User.create(users)
    logger.info(`Created ${createdUsers.length} users`)

    // Create categories
    const createdCategories = await Category.create(categories)
    logger.info(`Created ${createdCategories.length} categories`)

    // Create products
    const products = [
      {
        name: 'Medjool Dates Premium 500g',
        description: 'Large, soft Medjool dates known as the "king of dates". Sweet and caramel-like flavor, perfect for snacking or desserts.',
        price: 34.99,
        category: createdCategories[0]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800',
            publicId: 'medjool-dates-1'
          }
        ],
        stock: 150,
        weight: 500,
        featured: true
      },
      {
        name: 'Deglet Noor Dates 1kg',
        description: 'Semi-dry dates with a delicate sweetness and firm texture. Ideal for baking and cooking.',
        price: 24.99,
        category: createdCategories[0]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1577003833154-a2f3f17c4cd2?w=800',
            publicId: 'deglet-noor-1'
          }
        ],
        stock: 200,
        weight: 1000,
        featured: true
      },
      {
        name: 'Luxury Date Gift Box',
        description: 'Premium assortment of Medjool and Deglet Noor dates in an elegant wooden box. Perfect for gifts.',
        price: 59.99,
        category: createdCategories[1]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
            publicId: 'gift-box-luxury'
          }
        ],
        stock: 75,
        weight: 800,
        featured: true
      },
      {
        name: 'Ramadan Special Gift Set',
        description: 'Beautiful gift set with dates, nuts, and traditional sweets. Perfect for Ramadan celebrations.',
        price: 79.99,
        category: createdCategories[1]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1587496679742-bad502958fbf?w=800',
            publicId: 'ramadan-gift-set'
          }
        ],
        stock: 50,
        weight: 1200,
        featured: false
      },
      {
        name: 'Organic Date Paste 350g',
        description: 'Pure date paste made from organic dates. Natural sweetener for baking and cooking.',
        price: 18.99,
        category: createdCategories[2]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?w=800',
            publicId: 'date-paste'
          }
        ],
        stock: 100,
        weight: 350,
        featured: false
      },
      {
        name: 'Date Syrup 500ml',
        description: 'Natural date syrup with no added sugar. Perfect for pancakes, yogurt, and desserts.',
        price: 22.99,
        category: createdCategories[2]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800',
            publicId: 'date-syrup'
          }
        ],
        stock: 80,
        weight: 500,
        featured: false
      },
      {
        name: 'Organic Medjool Dates 750g',
        description: 'Certified organic Medjool dates. Grown without pesticides or chemicals.',
        price: 44.99,
        category: createdCategories[3]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1577003833154-a2f3f17c4cd2?w=800',
            publicId: 'organic-medjool'
          }
        ],
        stock: 60,
        weight: 750,
        featured: true
      },
      {
        name: 'Stuffed Dates with Almonds 400g',
        description: 'Premium dates stuffed with whole roasted almonds. A delicious and healthy snack.',
        price: 29.99,
        category: createdCategories[0]._id,
        images: [
          {
            url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800',
            publicId: 'stuffed-dates'
          }
        ],
        stock: 90,
        weight: 400,
        featured: false
      }
    ]

    const createdProducts = await Product.create(products)
    logger.info(`Created ${createdProducts.length} products`)

    logger.info('✅ Database seeded successfully!')
    logger.info('\n📊 Seed Summary:')
    logger.info(`   - Users: ${createdUsers.length}`)
    logger.info(`   - Categories: ${createdCategories.length}`)
    logger.info(`   - Products: ${createdProducts.length}`)
    logger.info('\n🔐 Admin Credentials:')
    logger.info('   Email: admin@oasisroyal.com')
    logger.info('   Password: admin123')
    logger.info('\n👤 Customer Credentials:')
    logger.info('   Email: customer@example.com')
    logger.info('   Password: customer123')

    process.exit(0)
  } catch (error) {
    logger.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
