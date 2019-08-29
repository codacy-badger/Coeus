import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import {
  login,
  forgotPassword,
  resetPassword,
  getRefreshToken,
  onlyCanUse
} from '../controllers/auth'

import {
  CheckLogin,
  CheckForgotPassword,
  CheckResetPassword
} from '../controllers/auth.validate'

const router = express.Router()
require('../../core/passport')

const secureIt = passport.authenticate('jwt', {
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
  CheckForgotPassword,
  forgotPassword
)

/*
 * Reset password route
 */
router.post(
  '/reset',
  trimRequest.all,
  CheckResetPassword,
  resetPassword
)

/*
 * Get new refresh token
 */
router.get(
  '/token',
  secureIt,
  onlyCanUse(['user', 'admin']),
  trimRequest.all,
  getRefreshToken
)

/*
 * Login route
 */
router.post('/login', trimRequest.all, CheckLogin, login)

module.exports = router
