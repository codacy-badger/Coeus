import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import cors from 'cors'
import passport from 'passport'
import rateLimit from 'express-rate-limit'
import compression from 'compression'
import morgan from 'morgan'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
// import history from 'express-history-api-fallback'
//
import routes from './core/express'
import conf from './core/config'
import { log } from './core/logger'
import User from '~/app/main/user/user.model'

const uuid = require('uuid/v4')

const MongoStore = require('connect-mongo')(session)

const RATE_LIMIT = conf.get('RATE_LIMIT') || 0

const app = express()

// Middlewares.

/**
 * This is a testing comment
 *
 * DONE:10 A task with a descrption looks like this. id:5
* - A list item
* - Another list item
* - <https://github.com/stevenselcuk/Coeus/issues/6>
* Steven J. Selcuk
* stevenjselcuk@gmail.com
 */

app.use(helmet())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
  })
)
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }))
app.use(compression())
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: conf.get('SESSION_NAME'),
    secret: conf.get('EXPRESS_SESSION_SECRET'),
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * conf.get('COOKIE_EXPIRATION_IN_DAYS'),
      sameSite: true,
      httpOnly: true,
      secure: conf.get('IS_PROD')
    }
  })
)

// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

app.use(cookieParser(conf.get('COOKIE_SECRET')))

const sendReq = (req, res) => {
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+       REQ        -+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  log.info(req)
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+       RES        -+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  log.info(res)
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+       MSC        -+-+-+-+-+-+-+-+-+-+')

  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  log.info('Cookies: ', req.cookies)
  log.info('Signed Cookies: ', req.signedCookies)
  log.info(req.session)
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
  console.log('-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+')
}

morgan.token('user', (req, res) => {
  sendReq(req, res)
  if (req.user) {
    return req.user.name
  }
  return 'Anonymous request'
})

if (conf.get('IS_PROD')) {
  app.use(morgan('combined'))
} else {
  app.use(
    morgan(':method :url :status :response-time ms - User: :user', {
      skip(req, res) {
        return res.statusCode >= 400
      },
      stream: { write: message => log.access(message) }
    })
  )
}

app.use(passport.initialize())
app.use(passport.session())

app.get('/healthcheck', (req, res) =>
  res
    .json({
      service: 'Coeus API',
      version: conf.get('VERSION')
    })
    .status(200)
)

app.get('/clear_cookie', (req, res) => {
  res.clearCookie('COEUS_JWT')
  res.send('COEUS_JWT removed').status(200)
})

app.use('/__', routes)

export default app
