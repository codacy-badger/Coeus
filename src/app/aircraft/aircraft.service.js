import Aircraft from './aircraft.model'
import {buildErrObject} from '~/middleware/utils'

module.exports = {
  async showAllAircrafts(args) {
    return new Promise((resolve, reject) => {
      try {
        console.log(args)
        resolve({isItOk: true})
      } catch (err) {
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },

  async showAircraft(args) {
    return new Promise((resolve, reject) => {
      try {
        console.log(args)
        resolve({registration: '1234'})
      } catch (err) {
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },
  async addAircraft(args) {
    return new Promise((resolve, reject) => {
      try {
        console.log(args)
        resolve({isItOk: true})
      } catch (err) {
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },
  async updateAircraft(args) {
    return new Promise((resolve, reject) => {
      try {
        console.log(args)
        resolve({isItOk: true})
      } catch (err) {
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  },
  async deleteAircraft(args) {
    return new Promise((resolve, reject) => {
      try {
        console.log(args)
        resolve({isItOk: true})
      } catch (err) {
        reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
      }
    })
  }
}
