import { ContextMiddleware } from '~/middleware/utils'
import {
  userTest,
  getUser,
  getAllUsers,
  getUserUnreadedNotifications,
  getUserUndoneTasks
} from './user.service'

module.exports = {
  userTest: (root, args, context) =>
    ContextMiddleware(context).then(() => userTest(args, context)),
  getUser: (root, args, context) =>
    ContextMiddleware(context, ['canGetUser']).then(() =>
       context.loaders.user.load(args.id)
    ),
  getUserUnreadedNotifications: (root, args, context) =>
    ContextMiddleware(context, ['canGetUser']).then(() =>
      getUserUnreadedNotifications(args, context)
    ),
  getUserUndoneTasks: (root, args, context) =>
    ContextMiddleware(context, ['canGetUser']).then(() =>
      getUserUndoneTasks(args, context)
    ),
  getAllUsers: (root, args, context) =>
    ContextMiddleware(context, ['canViewUsers']).then(() =>
      getAllUsers(args, context)
    )
}
