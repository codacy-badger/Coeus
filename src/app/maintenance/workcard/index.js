import { WorkcardTypes } from './workcard.type'
import * as WorkcardQuery from './workcard.query'
import * as WorkcardMutation from './workcard.mutation'


const WorkcardResolvers = {
	Query: {
	...WorkcardQuery,
},
  Mutation: {
  ...WorkcardMutation,
  }
}

export {
	WorkcardTypes,
	WorkcardResolvers
 }
