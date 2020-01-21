// import { matchedData } from 'express-validator'
import Workorder from './workorder.model'
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
export const getWorkorder = async (req, res) => {
  try {
    const workorderID = req.body.id
    res.status(200).json(buildSuccObject(await getItem(workorderID, Workorder)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Checks if a city already exists in database
 * @param {string} name - name of item
 */
const workorderIsAlreadyExists = async registration => {
  return new Promise((resolve, reject) => {
    Workorder.findOne(
      {
        registration
      },
      (err, item) => {
        itemAlreadyExists(err, item, reject, 'Workorder is already exist!')
        resolve(false)
      }
    )
  })
}

/**
 * Gets all items from database
 */
export const getAllWorkorders = async (req, res) => {
  return new Promise((resolve, reject) => {
    Workorder.find(
      {},
      '-updatedAt -createdAt',
      {
        sort: {
          workOrder: 1
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

export const queryWorkorders = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res
      .status(200)
      .json(buildSuccObject(await getAllItems(req, Workorder, query)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const getWorkorders = async (req, res) => {
  try {
    res
      .status(200)
      .json(buildSuccObject(await getItems(req, Workorder, req.query)))
  } catch (error) {
    handleError(res, error)
  }
}



export const getDeletedWorkorders = async (req, res) => {
  try {
    res.status(200).json(buildSuccObject(await getDeletedItems(Workorder)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const updateWorkorder = async (req, res) => {
  try {
    const workorderID = req.body.id
    res
      .status(200)
      .json(buildSuccObject(await updateItem(workorderID, Workorder, req.body)))
  } catch (error) {
    handleError(res, error)
  }
}

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
export const createWorkorder = async (req, res) => {
  try {
    const doesWorkorderExists = await workorderIsAlreadyExists(req.body.registration)
    if (!doesWorkorderExists) {
      res.status(201).json(buildSuccObject(await createItem(req, Workorder)))
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
export const deleteWorkorder = async (req, res) => {
  try {
    const workorderID = req.body.id
    const DeleterId = await isIDGood(req.user._id)
    res
      .status(200)
      .json(buildSuccObject(await deleteItem(workorderID, DeleterId, Workorder)))
  } catch (error) {
    handleError(res, error)
  }
}

export const restoreWorkorder = async (req, res) => {
  try {
    const workorderID = req.body.id
    res.status(200).json(buildSuccObject(await restoreItem(workorderID, Workorder)))
  } catch (error) {
    handleError(res, error)
  }
}
