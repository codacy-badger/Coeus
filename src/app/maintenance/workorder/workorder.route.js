import express from 'express'
import passport from 'passport'
import {
  getWorkorder
} from './workorder.controller'
import { onlyCanUse } from '../../main/auth/auth.controller'
import {
  checkGetWorkorder,
} from './workorder.validate'

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
  checkGetWorkorder,
  getWorkorder
)

export default router
