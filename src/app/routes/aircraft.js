import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import {
  getAllItems,
  getItems,
  createAircraft,
  getAircraft,
  updateItem,
  deleteItem
} from '../controllers/aircraft'
import {
  createCheck,
  updateCheck,
  getCheck,
  deleteCheck
} from '../controllers/aircraft.validate'
import AuthController from '../controllers/auth'

require('../../core/passport')

const requireAuth = passport.authenticate('jwt', {
  session: false
})

export const router = express.Router()

/*
 * Aircraft routes
 */

/*
 * Get all aircrafts with pagination
 */
router.get('/all', getAllItems)

/*
 * Aircraft/s data with query
 */
router.get(
  '/',
  //  requireAuth,
  //  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  //  requireAuth,
  //  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  createCheck,
  createAircraft
)

/*
 * Get an single aircraft data
 */
router.get(
  '/get',
  //   requireAuth,
  //   AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  getCheck,
  getAircraft
)

/*
 * Update aircraft (route)
 */
router.patch(
  '/',
//  requireAuth,
//  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  updateCheck,
  updateItem
)

/*
 * Delete aircraft (route)
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  deleteCheck,
  deleteItem
)

module.exports = router
