import { makeExecutableSchema } from 'graphql-tools'
// uncomment when adding more resolvers.
// import { merge } from 'lodash'

import { AircraftTypes, AircraftResolvers } from '~/app/aircraft'
import { UserTypes, UserResolvers } from '~/app/main/user'
// Maintenance
import { WorkorderTypes, WorkorderResolvers } from '~/app/maintenance/workorder'
import { WorkcardTypes, WorkcardResolvers } from '~/app/maintenance/workcard'

const Root = /* GraphQL */ `
  type Query {
    default: String
  }
  type Mutation {
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
// uncomment when adding more resolvers.
// const resolvers = merge(AircraftResolvers)

const schema = makeExecutableSchema({
  typeDefs: [Root, AircraftTypes, UserTypes, WorkorderTypes, WorkcardTypes],
  resolvers: [AircraftResolvers, UserResolvers, WorkorderResolvers, WorkcardResolvers],
})

export default schema
