import { Router } from 'express';

import Aircraft from '~/app/aircraft/aircraft.route'
import User from '~/app/main/user/user.route'
import Auth from '~/app/main/auth/auth.route'
import Workcard from '~/app/maintenance/workcard/workcard.route'

const router = Router();

router.use('/workcard', Workcard)
router.use('/aircraft', Aircraft)
router.use('/auth', Auth)
router.use('/user', User)

router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'ENDPOINT_NOT_FOUND'
    }
  })
})


export default router;
