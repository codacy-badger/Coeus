import AircraftService from './aircraft.service'
import { ContextMiddleware } from '~/middleware/utils'
import {
  addAircraftValidator,
  updateAircraftValidator
} from './aircraft.validate'

module.exports = {
  addAircraft: async (root, args, context) => {
    const { user, next,clerance } = context
    console.log(clerance)
    try {
      await ContextMiddleware(
        context,
        ['admin'],
        addAircraftValidator(args.input)
      )
      await AircraftService.addAircraft(args, context)
      return { message: 'Aircraft has been succesfully added', ok: true }
    } catch (err) {
      return next(err)
    }
  },
  updateAircraft: async (root, args, context) => {
    const { next, user } = context
    try {
      await ContextMiddleware(
        context,
        ['admin'],
        updateAircraftValidator({ ...args.input, id: args.id })
      )
      await AircraftService.updateAircraft(user, args.id, args.input)
      return { message: 'Aircraft has been succesfully updated', ok: true }
    } catch (err) {
      return next(err)
    }
  },
  deleteAircraft: async (root, args, context) => {
    const { next, user } = context
    try {
      await ContextMiddleware(context, ['admin'])
      await AircraftService.deleteAircraft(user, args)
      return { ok: true, message: 'Aircraft has been deleted successfully' }
    } catch (err) {
      return next(err)
    }
  }
}
