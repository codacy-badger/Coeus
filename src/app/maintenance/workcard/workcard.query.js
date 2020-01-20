import { ContextMiddleware } from '~/middleware/utils'
import { test, getWorkcard, getWorkcardsByWorkorder } from './workcard.service'

module.exports = {
  testWorkcardSystem: (root, args, context) =>
    ContextMiddleware(context).then(() => test(args, context)),
  getWorkcard: (root, args, context) =>
    ContextMiddleware(context, ['canEditAircraft']).then(() =>
    getWorkcard(args, context)
    ),
  getWorkcardsByWorkorder: (root, args, context) =>
    ContextMiddleware(context, ['canViewAircraft']).then(() =>
    getWorkcardsByWorkorder(args, context)
    )
}
