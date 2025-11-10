import { generateToken } from '../middlewares/auth.js'

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = async (req, res, next) => {
  try {
    // User is available in req.user (set by passport)
    const token = generateToken(req.user._id)

    // Redirect to frontend with token
    // Option 1: Redirect with token in URL (for SPA)
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=google`)

    // Option 2: Send JSON response (for API-only)
    // res.json({
    //   success: true,
    //   data: {
    //     _id: req.user._id,
    //     name: req.user.name,
    //     email: req.user.email,
    //     role: req.user.role,
    //     avatar: req.user.avatar,
    //     token
    //   },
    //   message: 'Google login successful'
    // })
  } catch (error) {
    next(error)
  }
}

// @desc    Facebook OAuth callback
// @route   GET /api/auth/facebook/callback
// @access  Public
export const facebookCallback = async (req, res, next) => {
  try {
    const token = generateToken(req.user._id)

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&provider=facebook`)
  } catch (error) {
    next(error)
  }
}

// @desc    OAuth error handler
// @route   GET /api/auth/failure
// @access  Public
export const authFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`)
}
