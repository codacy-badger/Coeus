import {
  makeExecutableSchema
} from 'graphql-tools'
import { merge } from 'lodash'

import { AircraftTypes, AircraftResolvers } from '~/app/aircraft'

const Root = /* GraphQL */ `
  type Query {
    dummy: String
    default: String
  }
  type Mutation {
    dummy: String
    default: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const resolvers = merge(AircraftResolvers)

const schema = makeExecutableSchema({
  typeDefs: [Root, AircraftTypes],
  resolvers: AircraftResolvers,
})

export default schema
