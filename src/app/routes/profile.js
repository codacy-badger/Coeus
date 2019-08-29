import { onlyCanUse } from '../controllers/auth'

const express = require('express');
const passport = require('passport');
const trimRequest = require('trim-request');
const controller = require('../controllers/profile')
const validate = require('../controllers/profile.validate')

require('../../core/passport');

const router = express.Router()


const secureIt = passport.authenticate('jwt', {
  session: false
})


/*
 * Profile routes
 */

/*
 * Get profile route
 */
router.get(
  '/',
  secureIt,
  onlyCanUse(['user', 'admin']),
  trimRequest.all,
  controller.getProfile
)

/*
 * Update profile route
 */
router.patch(
  '/',
  secureIt,
  onlyCanUse(['user', 'admin']),
  trimRequest.all,
  validate.updateProfile,
  controller.updateProfile
)

/*
 * Change password route
 */
router.post(
  '/changePassword',
  secureIt,
  onlyCanUse(['user', 'admin']),
  trimRequest.all,
  validate.changePassword,
  controller.changePassword
)

module.exports = router
