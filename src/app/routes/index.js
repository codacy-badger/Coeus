import express from 'express';
import chalk from 'chalk';
import moment from 'moment';
import { removeExtensionFromFile } from '../middleware/utils';

const router = express.Router()
const fs = require('fs')

const routesPath = `${__dirname}/`;

/*
 * Load routes statically and/or dynamically
 */
 router.use(function timeLog (req, res, next) {
   console.log(chalk.hex('#71E3D3')('🕝', moment().format('LLL')));
   next()
 })
 
// Load Auth route
router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and Auth route
fs.readdirSync(routesPath).filter(file => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file)
  // Prevents loading of this file and auth file
  return routeFile !== 'index' && routeFile !== 'auth'
    ? router.use(`/${routeFile}`, require(`./${routeFile}`))
    : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index')
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
