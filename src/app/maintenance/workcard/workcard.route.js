import express from 'express'
import passport from 'passport'
import {
  getWorkcard
} from './workcard.controller'
import { onlyCanUse } from '../../main/auth/auth.controller'
import {
  checkGetWorkcard,
} from './workcard.validate'

require('~/core/passport')

const secureIt = passport.authenticate('jwt', {
  session: true
})

export const router = express.Router()

/*
 * Workcard routes
 */

/*
 * Get work card with Workcard object ID
 */
router.post(
  '/get',
  secureIt,
  onlyCanUse(['admin']),
  checkGetWorkcard,
  getWorkcard
)

export default router
