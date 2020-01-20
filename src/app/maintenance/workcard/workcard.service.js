import Workcard from './workcard.model'
import { buildErrObject } from '~/middleware/utils'
import { log } from '~/core/logger'

// Gives you back a single workcard item
// You need to give workcard "id" in "args"
// DONT CONFUSE with HUMAN READEABLE CARD ID
// it is up to Mongo Object ID
const getWorkcard = async (args, context) => {
  return new Promise((resolve, reject) => {
    try {
      Workcard.findById(args.id).exec((err, result) => {
        if (err) {
          reject(buildErrObject(422, err.message))
        }
        resolve(result)
      })
    } catch (err) {
      reject(buildErrObject(422, 'Cannot found Workcard. Check functions...'))
    }
  })
}

const getWorkcardsByWorkorder = async (args, context) => {
  if (args) {
    log.info(args)
  }
  if (context) {
    log.info(context)
  }

  return new Promise((resolve, reject) => {
    try {
      Workcard.find(
        {},
        '-updatedAt -createdAt',
        {
          sort: {
            totalFlightCycle: -1
          }
        },

        (err, items) => {
          if (err) {
            reject(buildErrObject(422, err.message))
          }
          const totalCount = Workcard.countDocuments()
          resolve({ totalCount, data: items })
        }
      )
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

const test = async args => {
  return new Promise((resolve, reject) => {
    try {
      console.log(args)
      resolve({ ok: true, message: 'Yup, seems good 🙌🏻' })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

export { test, getWorkcardsByWorkorder, getWorkcard }
