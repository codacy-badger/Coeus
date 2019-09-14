import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import Redis from 'ioredis'
import { RedisCache } from 'apollo-server-cache-redis'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import depthLimit from 'graphql-depth-limit'
import { giveTokenGetUser } from '~/middleware/utils'
import conf from './config'
import { log, show } from '~/core/logger'

import schema from '~/app/schema'

const config = conf.get('IS_PROD')
  ? {
      port: conf.get('REDIS_PORT'),
      host: conf.get('REDIS_URL'),
      password: conf.get('REDIS_PASSWORD')
    }
  : null
const redisCache = new Redis(config)

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
  context: async ({ req, res, ...rest }, ...other) => {
    let token = null
    let currentUser = null;

    if (req.headers.authorization) {
      token = req.headers.authorization.replace('Bearer ', '').trim()
    } else if (req.signedCookies) {
      token = req.signedCookies.COEUS_JWT
    }
    try {
      currentUser = await giveTokenGetUser(token)
    } catch (e) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in'
      )
    }

    return {
      //      loaders,
      req,
      res,
      user: currentUser,
      userID: currentUser._id,
      clerance: currentUser.clerance,
      logged: true
    }
  },
  schemaDirectives: {},
  playground: conf.get('IS_PROD')
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
  validationRules: [depthLimit(10)],
  plugins: [
    responseCachePlugin({
      sessionId: ({ context }) => context.userID,
      shouldReadFromCache: ({ context }) => !context.logged,
      shouldWriteToCache: ({ context }) => !context.logged,
    })
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
