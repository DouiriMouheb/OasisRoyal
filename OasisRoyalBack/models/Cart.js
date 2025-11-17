import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  }
})

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    items: [cartItemSchema],
    subtotal: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    },
    shipping: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  const SHIPPING_COST = 10
  const TAX_RATE = 0.1
  const FREE_SHIPPING_THRESHOLD = 100

  // Calculate subtotal
  this.subtotal = this.items.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  // Calculate shipping
  this.shipping = this.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

  // Calculate tax
  this.tax = this.subtotal * TAX_RATE

  // Calculate total
  this.total = this.subtotal + this.shipping + this.tax

  // Round to 2 decimal places
  this.subtotal = Number(this.subtotal.toFixed(2))
  this.tax = Number(this.tax.toFixed(2))
  this.shipping = Number(this.shipping.toFixed(2))
  this.total = Number(this.total.toFixed(2))

  next()
})

// Method to get item count
cartSchema.methods.getItemCount = function () {
  return this.items.reduce((count, item) => count + item.quantity, 0)
}

export default mongoose.model('Cart', cartSchema)
