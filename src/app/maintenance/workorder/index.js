import { WorkorderTypes } from './workorder.type'
import * as WorkorderQuery from './workorder.query'
import * as WorkorderMutation from './workorder.mutation'


const WorkorderResolvers = {
	Query: {
	...WorkorderQuery,
},
  Mutation: {
  ...WorkorderMutation,
  }
}

export {
	WorkorderTypes,
	WorkorderResolvers
 }
