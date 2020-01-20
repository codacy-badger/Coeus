// import { matchedData } from 'express-validator'
import Workcard from './workcard.model'
import {
  handleError,
  buildErrObject,
  buildSuccObject,
  itemAlreadyExists,
  isIDGood
} from '~/middleware/utils'
import {
  updateItem,
  restoreItem,
  deleteItem,
  createItem,
  getAllItems,
  getItems,
  getDeletedItems,
  getItem,
  checkQueryString
} from '~/middleware/db'

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const getWorkcard = async (req, res) => {
  try {
    const workcardID = req.body.id
    res.status(200).json(buildSuccObject(await getItem(workcardID, Workcard, 'aircraft')))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const workcardIsAlreadyExists = async registration => {
  return new Promise((resolve, reject) => {
    Workcard.findOne(
      {
        registration
      },
      (err, item) => {
        itemAlreadyExists(err, item, reject, 'Workcard is already exist!')
        resolve(false)
      }
    )
  })
}

/**
 * Gets all items from database
 */
export const getAllWorkcards = async (req, res) => {
  return new Promise((resolve, reject) => {
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
        res.status(200).json(buildSuccObject(items))
      }
    )
  })
}

export const queryWorkcards = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res
      .status(200)
      .json(buildSuccObject(await getAllItems(req, Workcard, query)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const getWorkcards = async (req, res) => {
  try {
    res
      .status(200)
      .json(buildSuccObject(await getItems(req, Workcard, req.query)))
  } catch (error) {
    handleError(res, error)
  }
}



export const getDeletedWorkcards = async (req, res) => {
  try {
    res.status(200).json(buildSuccObject(await getDeletedItems(Workcard)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const updateWorkcard = async (req, res) => {
  try {
    const workcardID = req.body.id
    res
      .status(200)
      .json(buildSuccObject(await updateItem(workcardID, Workcard, req.body)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const createWorkcard = async (req, res) => {
  try {
    const doesWorkcardExists = await workcardIsAlreadyExists(req.body.registration)
    if (!doesWorkcardExists) {
      res.status(201).json(buildSuccObject(await createItem(req, Workcard)))
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
export const deleteWorkcard = async (req, res) => {
  try {
    const workcardID = req.body.id
    const DeleterId = await isIDGood(req.user._id)
    res
      .status(200)
      .json(buildSuccObject(await deleteItem(workcardID, DeleterId, Workcard)))
  } catch (error) {
    handleError(res, error)
  }
}

export const restoreWorkcard = async (req, res) => {
  try {
    const workcardID = req.body.id
    res.status(200).json(buildSuccObject(await restoreItem(workcardID, Workcard)))
  } catch (error) {
    handleError(res, error)
  }
}
