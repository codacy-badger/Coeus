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
// import history from 'express-history-api-fallback'
import router from './app/routes'
import conf from './core/config'
import {log} from './utils/logger'

const MongoStore = require('connect-mongo')(session)

const RATE_LIMIT = conf.get('RATE_LIMIT') || 0

const app = express()

// Middlewares.
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
      maxAge: parseInt(1440, 10),
      sameSite: true,
      httpOnly: true,
      secure: conf.get('IS_PROD')
    }
  })
)
app.use(passport.initialize())
app.use(passport.session())
if (conf.get('IS_PROD')) {
  app.use(morgan('combined'))
} else {
  app.use(
    morgan('dev', {
      skip(req, res) {
        return res.statusCode >= 400
      },
      stream: { write: message => log.access(message) }
    })
  )
}
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

app.get('/', (req, res) =>
  res.json({ 
    service: 'Coeus API',
    version: conf.get('VERSION')
  }).status(200)
)

app.use('/__', router)

module.exports = app
