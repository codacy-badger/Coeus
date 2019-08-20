import { Router } from 'express';
import chalk from 'chalk';
import moment from 'moment';

export const TheRouter = Router();

// middleware that is specific to this router
TheRouter.use(function timeLog (req, res, next) {
  console.log(chalk.hex('#71E3D3')('🕝', moment().format('LLL')));
  next()
})
// define the home page route
TheRouter.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
TheRouter.get('/about', function (req, res) {
  res.send('About birds')
})
