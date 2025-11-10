import express from 'express'
import passport from '../config/passport.js'
import { googleCallback, facebookCallback, authFailure } from '../controllers/authController.js'

const router = express.Router()

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Authentication - OAuth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication - OAuth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to frontend with token
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/failure',
    session: false 
  }),
  googleCallback
)

/**
 * @swagger
 * /api/auth/facebook:
 *   get:
 *     summary: Initiate Facebook OAuth login
 *     tags: [Authentication - OAuth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to Facebook login page
 */
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
)

/**
 * @swagger
 * /api/auth/facebook/callback:
 *   get:
 *     summary: Facebook OAuth callback
 *     tags: [Authentication - OAuth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to frontend with token
 */
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/api/auth/failure',
    session: false 
  }),
  facebookCallback
)

/**
 * @swagger
 * /api/auth/failure:
 *   get:
 *     summary: OAuth failure redirect
 *     tags: [Authentication - OAuth]
 *     security: []
 *     responses:
 *       302:
 *         description: Redirects to frontend login page with error
 */
router.get('/failure', authFailure)

export default router
