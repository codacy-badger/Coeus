import Aircraft from './aircraft.model'
import { buildErrObject } from '~/middleware/utils'
import { log } from '~/core/logger'

const getAllAircrafts = async (args, context) => {
  log.info(context.dataloaders.AircraftData.load('5d793d2b0f3a39bb442c8a19'))

  return new Promise((resolve, reject) => {
    try {
      Aircraft.find(
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
          const totalCount = Aircraft.countDocuments()
          resolve({ totalCount, data: items })
        }
      )
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
    }
  })
}

const getAircraft = async (args, context) => {

  return new Promise((resolve, reject) => {
    try {

      Aircraft.findById(args.id, (err, item) => {
        resolve(item)
      })
    } catch (err) {
      reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
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

export {
  getAllAircrafts,
  getAircraft,
  addAircraft,
  updateAircraft,
  deleteAircraft
}
