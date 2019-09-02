import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import {
  getUsers,
  getUser,
  createNewUser,
  verifyUser,
  deleteUser,
  updateUser
} from './user.controller'
import {
   checkVerify,
   checkNewUser,
   checkUpdateUser,
   checkGetUser,
   checkDeleteUser
 } from './user.validate'
 
import { onlyCanUse } from '../auth/auth.controller'

const router = express.Router()
require('~/core/passport')

const secureIt = passport.authenticate('jwt', {
  session: true
})

/*
 * Users routes
 */

/*
 * Get users route
 */
router.get(
  '/',
//  secureIt,
//  onlyCanUse(['admin']),
  trimRequest.all,
  getUsers
)

/*
 * Create new item route
 */
router.post(
  '/',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkNewUser,
  createNewUser
)

/*
 * Verify route
 */
router.post('/verify', trimRequest.all, checkVerify, verifyUser)

/*
 * Get item route
 */
router.get(
  '/:id',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkGetUser,
  getUser
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkUpdateUser,
  updateUser
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkDeleteUser,
  deleteUser
)

module.exports = router
