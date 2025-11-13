import './env.js' // Load environment variables first
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import User from '../models/User.js'
import logger from '../utils/logger.js'

// Google OAuth Strategy - Only initialize if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && !process.env.GOOGLE_CLIENT_ID.startsWith('your_google_client_id_here')) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/google/callback`,
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          logger.info('Google OAuth callback triggered')
          logger.info('Profile data:', { id: profile.id, email: profile.emails?.[0]?.value, name: profile.displayName })
          
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails[0].value })

          if (user) {
            logger.info(`Existing user found: ${user.email}`)
            // User exists, check if Google ID is linked
            if (!user.googleId) {
              user.googleId = profile.id
              await user.save()
            }
            return done(null, user)
          }

          // Create new user
          logger.info('Creating new user from Google profile')
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            avatar: profile.photos[0]?.value,
            isEmailVerified: true, // Google emails are verified
            password: Math.random().toString(36).slice(-8) // Random password (won't be used)
          })

          logger.info(`New user registered via Google: ${user.email}`)
          done(null, user)
        } catch (error) {
          logger.error('Google OAuth error:', error)
          logger.error('Error stack:', error.stack)
          done(error, null)
        }
      }
    )
  )
  logger.info('Google OAuth strategy initialized')
} else {
  logger.warn('Google OAuth not configured - skipping Google strategy initialization')
}

// Facebook OAuth Strategy - Only initialize if credentials are provided
if (process.env.FACEBOOK_APP_ID && !process.env.FACEBOOK_APP_ID.startsWith('your_facebook_app_id_here')) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name', 'picture.type(large)']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await User.findOne({ email: profile.emails[0].value })

          if (user) {
            // User exists, check if Facebook ID is linked
            if (!user.facebookId) {
              user.facebookId = profile.id
              await user.save()
            }
            return done(null, user)
          }

          // Create new user
          user = await User.create({
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            facebookId: profile.id,
            avatar: profile.photos[0]?.value,
            isEmailVerified: true, // Facebook emails are verified
            password: Math.random().toString(36).slice(-8) // Random password (won't be used)
          })

          logger.info(`New user registered via Facebook: ${user.email}`)
          done(null, user)
        } catch (error) {
          logger.error('Facebook OAuth error:', error)
          done(error, null)
        }
      }
    )
  )
  logger.info('Facebook OAuth strategy initialized')
} else {
  logger.warn('Facebook OAuth not configured - skipping Facebook strategy initialization')
}

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

export default passport
