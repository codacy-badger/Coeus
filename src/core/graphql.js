import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import Redis from 'ioredis'
import { RedisCache } from 'apollo-server-cache-redis';
import depthLimit from 'graphql-depth-limit';
import { jwtExtractor } from './passport'
import { verifyTheToken } from '~/middleware/utils'
import User from '~/app/main/user/user.model'
import conf from './config'

import schema from '~/app/schema';

const config = conf.get('IS_PROD')
    ? {
        port: conf.get('REDIS_CACHE_PORT'),
        host: conf.get('REDIS_CACHE_URL'),
        password: conf.get('REDIS_CACHE_PASSWORD'),
      }
    : undefined;

const redisCache = new Redis(config);

export const pubsub = new PubSub()

export default new ApolloServer({
  schema,
  introspection: conf.get('IS_DEV'),
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '')

    return {
      ...error,
      message
    }
  },
  context: async ({ req }) => {
    try {
      let token = null
      if (req.signedCookies) {
        token = req.signedCookies.COEUS_JWT
      }
      if (req.headers.authorization) {
        token = req.headers.authorization.replace('Bearer ', '').trim()
      } else if (req.body.token) {
        token = req.body.token.trim()
      } else if (req.query.token) {
        token = req.query.token.trim()
      }
      const userID = await verifyTheToken(token)
      User.findById(userID, (err, user) => {
        if (err) {
          return console.log(err)
        }
        return console.log(user)
      })
    } catch (e) {
        throw new AuthenticationError(
            'Authentication token is invalid, please log in'
        )
    }
},
  schemaDirectives: {},
  playground:
    conf.get('IS_PROD')
      ? false
      : {
          settings: {
            'request.credentials': 'include',
            'schema.polling.enable': false
          }
        },
 //  subscriptions: {
 //    onConnect: () => {},
 //    onDisconnect: () => {}
 //  },
  maxFileSize: 25 * 1024 * 1024, // 25MB
  debug: conf.get('IS_DEV'),
  engine: false,
  tracing: false,
  validationRules: [
    depthLimit(10),
  ],
  cacheControl: {
    calculateHttpHeaders: false,
    // Cache everything for at least a minute since we only cache public responses
    defaultMaxAge: 6000
  },
  cache: new RedisCache({
    redisCache,
    prefix: 'apollo-cache:'
  })
})
