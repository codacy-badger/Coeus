import { ContextMiddleware } from '~/middleware/utils'
import AircraftService from './aircraft.service'

module.exports = {
  showAircraft: (root, args, context) =>
    ContextMiddleware(context, ['admin']).then(() =>
      AircraftService.showAircraft({ context, args })
    ),
  showAllAircrafts: (root, args, context) =>
    ContextMiddleware(context, ['admin']).then(() =>
      AircraftService.showAllAircrafts(args)
    )
}
