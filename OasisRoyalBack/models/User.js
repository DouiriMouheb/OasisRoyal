import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: function() {
        // Password is required only if not using OAuth
        return !this.googleId && !this.facebookId
      },
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    phone: {
      type: String,
      trim: true
    },
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String
    },
    // OAuth fields
    googleId: {
      type: String,
      unique: true,
      sparse: true // Allows multiple null values
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true
    },
    avatar: {
      type: String // Profile picture URL from OAuth provider
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
