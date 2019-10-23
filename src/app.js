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
import routes from './core/express'
import conf from './core/config'
import { log } from './core/logger'

const MongoStore = require('connect-mongo')(session)
const eer = require('expeditious-engine-redis')
const ExpeditiousCache = require('express-expeditious')
const swStats = require('swagger-stats')
const swaggerUi = require('swagger-ui-express')
const apiSpec = require('../swagger.json')
const swaggerDocument = require('../swagger.json')

const RATE_LIMIT = conf.get('RATE_LIMIT') || 0

const app = express()

// Middlewares.

app.use(helmet())
app.use(
  cors({
    origin: 'hangar://webapp',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
  })
)

app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }))
app.use(compression())

app.use(swStats.getMiddleware({ swaggerSpec: apiSpec }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
})

app.use(
  session({
    store: sessionStore,
    name: conf.get('SESSION_NAME'),
    secret: conf.get('EXPRESS_SESSION_SECRET'),
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: true,
      httpOnly: true,
      secure: conf.get('IS_PROD')
    }
  })
)

app.use(
  ExpeditiousCache({
    namespace: 'CoeusCache',
    defaultTtl: '10 minute',
    engine: eer({
      host: conf.get('REDIS_HOST'),
      port: conf.get('REDIS_PORT')
    })
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

morgan.token('user', req => {
  console.log(req)
  if (req.user) {
    console.log(req)
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
      version: conf.get('VERSION'),
      session: req.session,
      cookie: req.signedCookies
    })
    .status(200)
)

app.get('/clear_cookie', (req, res) => {
  res.clearCookie('jwt')
  res.clearCookie('COEUS')
  res.send('COEUS_JWT removed').status(200)
})

app.use('/__', routes)

export default app
