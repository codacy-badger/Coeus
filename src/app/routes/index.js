import express from 'express';
import { removeExtensionFromFile } from '../middleware/utils';
import { log } from '../../utils/logger'

const router = express.Router()
const fs = require('fs')

const routesPath = `${__dirname}/`;

/*
 * A router function example

 router.use(function timeLog (req, res, next) {
  log.access('A Access')
  next()
 })
  */
// Load Auth route
router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`)) // eslint-disable-line 
    : ''
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  })
})

module.exports = router
