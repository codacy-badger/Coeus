import { ContextMiddleware } from '~/middleware/utils'
import { getAircraft, getAllAircrafts } from './aircraft.service'

export default {
  showSingleAircraft: (root, args, context) =>
    ContextMiddleware(context, ['canEditAircraft']).then(() =>
      getAircraft(args, context)
    ),
  showAllAircrafts: (root, args, context) =>
    ContextMiddleware(context, ['canEditAircraft']).then(() =>
      getAllAircrafts(args, context)
    )
}
