import { schemaComposer, composeWithRelay, Resolver } from 'graphql-compose'
import { UserTC } from '~/app/main/user/user.model'
import { AircraftTC } from '~/app/main/aircraft/aircraft.model'



schemaComposer.Query.addFields({
	userById: UserTC.getResolver('findById'),
  userByIds: UserTC.getResolver('findByIds'),
  userOne: UserTC.getResolver('findOne'),
  userMany: UserTC.getResolver('findMany'),
  userCount: UserTC.getResolver('count'),
  userConnection: UserTC.getResolver('connection'),
  userPagination: UserTC.getResolver('pagination'),
  aircraftById: AircraftTC.getResolver('findById'),
  aircraftByIds: AircraftTC.getResolver('findByIds'),
  aircraftOne: AircraftTC.getResolver('findOne'),
  aircraftMany: AircraftTC.getResolver('findMany'),
  aircraftCount: AircraftTC.getResolver('count'),
  aircraftConnection: AircraftTC.getResolver('connection'),
  aircraftPagination: AircraftTC.getResolver('pagination')
})


function addQueryToPayload(resolvers: {
  [name: string]: Resolver<any, any, any>
}) {
  Object.keys(resolvers).forEach(k => {
    resolvers[k].getOTC().setField('query', {
      type: 'Query',
      resolve: () => ({})
    })
  })
  return resolvers
}

schemaComposer.Mutation.addFields({
  ...addQueryToPayload({
    userCreateOne: UserTC.getResolver('createOne'),
    userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userUpdateMany: UserTC.getResolver('updateMany'),
    userRemoveById: UserTC.getResolver('removeById'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    userRemoveMany: UserTC.getResolver('removeMany'),
    aircraftCreateOne: AircraftTC.getResolver('createOne'),
    aircraftCreateMany: AircraftTC.getResolver('createMany'),
    aircraftUpdateById: AircraftTC.getResolver('updateById'),
    aircraftUpdateOne: AircraftTC.getResolver('updateOne'),
    aircraftUpdateMany: AircraftTC.getResolver('updateMany'),
    aircraftRemoveById: AircraftTC.getResolver('removeById'),
    aircraftRemoveOne: AircraftTC.getResolver('removeOne'),
    aircraftRemoveMany: AircraftTC.getResolver('removeMany')
  })
})

export default schemaComposer.buildSchema()
