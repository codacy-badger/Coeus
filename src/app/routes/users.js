import {
  getUsers,
  getUser,
  createNewUser,
  verifyUser,
  deleteUser,
  updateUser
} from '../controllers/users'

const express = require('express')
const passport = require('passport')
const trimRequest = require('trim-request')
const validate = require('../controllers/users.validate')
const AuthController = require('../controllers/auth')

const router = express.Router()
require('../../core/passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

/*
 * Users routes
 */

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  getUsers
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.createItem,
  createNewUser
)

/*
 * Verify route
 */
router.post('/verify', trimRequest.all, validate.verify, verifyUser)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.getItem,
  getUser
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.updateItem,
  updateUser
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  validate.deleteItem,
  deleteUser
)

module.exports = router
