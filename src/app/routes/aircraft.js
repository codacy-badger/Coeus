import express from 'express'
import passport from 'passport'
import trimRequest from 'trim-request'
import {
  getAllItems,
  getAllAircrafts,
  getItems,
  createAircraft,
  getAircraft,
  updateItem,
  deleteItem
} from '../controllers/aircraft'
import { onlyCanUse } from '../controllers/auth'
import {
  checkCreateAircraft,
  checkAircraftUpdate,
  checkGetAircraft,
  checkDeleteAircraft
} from '../controllers/aircraft.validate'


require('../../core/passport')

const secureIt = passport.authenticate('jwt', {
  session: true
})

export const router = express.Router()

/*
 * Aircraft routes
 */

/*
 * Get all aircrafts with pagination
 */
router.get('/all', getAllAircrafts)


/*
 * Aircraft/s data with query
 */
router.get(
  '/find',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  getAllItems
)

/*
 * Aircraft/s data with query
 */
router.get(
  '/',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  getItems
)

/*
 * Create new item route
 */
router.post(
  '/',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkCreateAircraft,
  createAircraft
)

/*
 * Get an single aircraft data
 */
router.get(
  '/get',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkGetAircraft,
  getAircraft
)

/*
 * Update aircraft (route)
 */
router.patch(
  '/',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkAircraftUpdate,
  updateItem
)

/*
 * Delete aircraft (route)
 */
router.delete(
  '/:id',
  secureIt,
  onlyCanUse(['admin']),
  trimRequest.all,
  checkDeleteAircraft,
  deleteItem
)

module.exports = router
