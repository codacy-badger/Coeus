import { matchedData } from 'express-validator'
import Aircraft from '../models/aircraft'
import {
  handleError,
  buildErrObject,
  itemAlreadyExists,
	isIDGood
} from '../middleware/utils'
import db from '../middleware/db'
import { log } from '../../utils/logger'

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const aircraftExists = async registration => {
  return new Promise((resolve, reject) => {
    Aircraft.findOne(
      {
        registration
      },
      (err, item) => {
        itemAlreadyExists(err, item, reject, 'AIRCRAFT_ALREADY_EXISTS')
        resolve(false)
      }
    )
  })
}

/**
 * Gets all items from database
 */
const getAllAircrafts = async () => {
  return new Promise((resolve, reject) => {
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
        resolve(items)
      }
    )
  })
}

export const getAllItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getAllItems(req, Aircraft, query))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const getItems = async (req, res) => {
  try {
    res.status(200).json(await db.getItems(req, Aircraft, req.query))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const getAircraft = async (req, res) => {
  try {
    const id = await isIDGood(req.body.id)
    res.status(200).json(await db.getItem(id, Aircraft))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const updateItem = async (req, res) => {
  try {
    const id = await isIDGood(req.body.id)
      res.status(200).json(await db.updateItem(id, Aircraft, req.body))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const createAircraft = async (req, res) => {
  try {
    const doesAircraftExists = await aircraftExists(req.body.registration)
    if (!doesAircraftExists) {
      res.status(201).json(await db.createItem(req, Aircraft))
    }
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const deleteItem = async (req, res) => {
  try {
    const id = await isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, Aircraft))
  } catch (error) {
    handleError(res, error)
  }
}
