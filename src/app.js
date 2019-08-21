import 'dotenv/config';
import { join } from 'path';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import passport from'passport';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import history from 'express-history-api-fallback';
import router from './app/routes';

const MongoStore = require('connect-mongo')(session);

const RATE_LIMIT = process.env.RATE_LIMIT || 0;
const STATIC_FILES = process.env.STATIC_FILES || 'public';
const root = join(__dirname, `../${STATIC_FILES}`);

const app = express();
// Middlewares.
app.use(helmet());
app.use(cors(
  {
          origin: '*',
          allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
          allowHeaders: ['Content-Type', 'Authorization'],
          exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
        }
))
app.use(rateLimit({ max: Number(RATE_LIMIT), windowMs: 15 * 60 * 1000 }));
app.use(compression());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(process.env.SESSION_MAX_AGE, 10),
      sameSite: true,
      httpOnly: true,
      secure: !process.env.NODE_ENV === 'development'
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(
    morgan('combined', {
//      skip: (req, res) => req.url === HEALTH_CHECK_URL && res.statusCode === 200
    })
  )
}
// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
);
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
);

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/__', router);

export default app;