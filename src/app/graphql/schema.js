import 'dotenv/config'
import {
  makeExecutableSchema,
  addSchemaLevelResolveFunction
} from 'graphql-tools'
import { merge } from 'lodash'

const debug = require('debug')('api:resolvers')
const logExecutions = require('graphql-log')({
  logger: debug,
});
// typeDefs

// Queries

// Mutations

// Subscriptions

const Root = /* GraphQL */ `
  directive @rateLimit(
    max: Int
    window: Int
    message: String
    identityArgs: [String]
    arrayLengthField: String
  ) on FIELD_DEFINITION
  # The dummy queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;


const resolvers = merge(
  {},
  //queries
  ThreadQueries,
  channelQueries,
  communityQueries,
  messageQueries,
  userQueries,
  directMessageThreadQueries,
  reactionQueries,
  notificationQueries,
  metaQueries,
  searchQueries,
  communityMemberQueries,
  communitySlackSettingsQueries,
  channelSlackSettingsQueries,
  // mutations
  messageMutations,
  threadMutations,
  directMessageThreadMutations,
  reactionMutations,
  communityMutations,
  channelMutations,
  notificationMutations,
  userMutations,
  metaMutations,
  communityMemberMutations,
  fileMutations,
  // subscriptions
  messageSubscriptions,
  notificationSubscriptions,
  directMessageThreadSubscriptions,
  threadSubscriptions,
  communitySubscriptions
);


export const schema = makeExecutableSchema({
  typeDefs: [
    scalars.typeDefs,
    generalTypes,
    Root,
    Community,
    CommunitySlackSettings,
    CommunityMember,
    Channel,
    ChannelSlackSettings,
    Thread,
    ThreadParticipant,
    Message,
    Reaction,
    User,
    DirectMessageThread,
    Notification,
    Meta,
    Invoice,
    Search,
  ],
  resolvers,
  schemaDirectives: IS_PROD
    ? {
        rateLimit,
      }
    : {},
});

if (process.env.NODE_ENV === 'development') {
  logExecutions(resolvers);
}