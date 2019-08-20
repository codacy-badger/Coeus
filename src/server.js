import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import chalk from 'chalk';
import morgan from 'morgan';
import passport from'passport';
import jwt from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import DataLoader from 'dataloader';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { logger } from './utils/logger';
import router from './app/routes';
import {InitMongo} from './core/db';

import loaders from './app/graphql/loaders';
import schema from './app/graphql/schema';
import resolvers from './app/graphql/resolvers';
import models from './app/graphql/models';

const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;

const app = express();


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(
    morgan('combined', {
//      skip: (req, res) => req.url === HEALTH_CHECK_URL && res.statusCode === 200
    })
  )
}

app.use(cors());
app.use(passport.initialize());
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

if (process.env.NODE_ENV === 'development') {
  logger(app);
}

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/__', router);



InitMongo();

mongoose.connection.once('open', () => {
  app.listen(port, () => console.log(chalk.hex('#F7BF63')(' ✅  Server has started at PORT 3000.')));
});

export default app;