import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required']
    },
    images: [
      {
        url: String,
        publicId: String
      }
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    weight: {
      type: Number,
      min: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
)

productSchema.index({ name: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
