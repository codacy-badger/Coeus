import { ContextMiddleware } from '~/middleware/utils'
import { test, getWorkorder, getWorkordersByAircraft } from './workorder.service'

module.exports = {
  testWorkorderSystem: (root, args, context) =>
    ContextMiddleware(context).then(() => test(args, context)),
    getWorkorder: (root, args, context) =>
    ContextMiddleware(context, ['canEditAircraft']).then(() =>
    getWorkorder(args, context)
    ),
    getWorkordersByAircraft: (root, args, context) =>
    ContextMiddleware(context, ['canViewAircraft']).then(() =>
    getWorkordersByAircraft(args, context)
    )
}
