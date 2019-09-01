import express from 'express'
const router = express.Router()

import Aircraft from './main/aircraft/aircraft.route'
import User from './main/user/user.route'
import Auth from './main/auth/auth.route'

router.use('/aircraft', Aircraft)
router.use('/user', User)
router.use('/auth', Auth)

router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'ENDPOINT_NOT_FOUND'
    }
  })
})

export default router
