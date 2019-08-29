const express = require('express');
const passport = require('passport');
const trimRequest = require('trim-request');
const controller = require('../controllers/auth')
const validate = require('../controllers/auth.validate')
const AuthController = require('../controllers/auth')



const router = express.Router()
require('../../core/passport')


const requireAuth = passport.authenticate('jwt', {
  session: false
})


/*
 * Auth routes
 */

/*
 * Forgot password route
 */
router.post(
  '/forgot',
  trimRequest.all,
  validate.forgotPassword,
  controller.forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset',
  trimRequest.all,
  validate.resetPassword,
  controller.resetPassword
)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  requireAuth,
  AuthController.roleAuthorization(['user', 'admin']),
  trimRequest.all,
  controller.getRefreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, validate.login, controller.login)

module.exports = router
