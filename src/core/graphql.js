import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { PubSub } from 'graphql-subscriptions'
import { importSchema } from 'graphql-import';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas'
import { resolve } from 'path'
import DataLoader from 'dataloader'
import { jwtExtractor } from './passport'

import typeDefs from '../app/graphql/schema'
import resolvers from '../app/graphql/resolvers'
import models from '../app/models'
import loaders from '../app/graphql/loaders'

// const typeDefs = mergeTypes(
//  fileLoader(resolve(__dirname, '../app/graphql/schema'))
// );

export const pubsub = new PubSub()

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
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
  context: async () => {},
  schemaDirectives: {},
  subscriptions: {
    onConnect: () => {},
    onDisconnect: () => {}
  }
})
