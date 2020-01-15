import User from './user.model'
import { buildErrObject } from '~/middleware/utils'
import { log } from '~/core/logger'

const getAllUsers = async (args, context) => {
  return new Promise((resolve, reject) => {
    try {
      User.find({}, (err, items) => {
        console.log(items)
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        const totalCount = User.countDocuments()
        resolve({ totalCount, data: items })
      })
    } catch (err) {
      reject(buildErrObject(422, 'QUERY RUN TIME ERROR 🤔'))
    }
  })
}

const getUser = async (args, context) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(context.loaders.user.load(args.id))
    } catch (err) {
      reject(buildErrObject(422, 'NO USER 🤷‍♂️'))
    }
  })
}

const getUserUnreadedNotifications = async (args, context) => {
  const user = await context.loaders.user.load(args.id)
  const unReadednotifications = user.notifications.filter(not => {
    return not.readed === false
  })
  return new Promise((resolve, reject) => {
    try {
      resolve({ notifications: unReadednotifications })
    } catch (err) {
      reject(buildErrObject(422, 'No notifications 🤷‍♂️'))
    }
  })
}

const getUserUndoneTasks = async (args, context) => {
  const user = await context.loaders.user.load(args.id)
  const unDonetasks = user.tasks.filter(not => {
    return not.done === false
  })
  return new Promise((resolve, reject) => {
    try {
      resolve({ tasks: unDonetasks })
    } catch (err) {
      reject(buildErrObject(422, 'No tasks 🤷‍♂️'))
    }
  })
}

const addAircraft = async args => {
  return new Promise((resolve, reject) => {
    try {
      console.log(args)
      resolve({ registration: 'stuff' })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

const updateAircraft = async args => {
  return new Promise((resolve, reject) => {
    try {
      console.log(args)
      resolve({ registration: 'stuff' })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

const deleteAircraft = async args => {
  return new Promise((resolve, reject) => {
    try {
      console.log(args)
      resolve({ registration: 'stuff' })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

const userTest = async args => {
  return new Promise((resolve, reject) => {
    try {
      console.log(args)
      resolve({ ok: true, message: 'Yup, seems good 🙌🏻 You are on user line' })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_SOMETHING'))
    }
  })
}

export {
  userTest,
  getAllUsers,
  getUser,
  getUserUnreadedNotifications,
  getUserUndoneTasks,
  updateAircraft,
  deleteAircraft
}
