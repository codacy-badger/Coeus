import requestIp from 'request-ip';
import jwt from 'jsonwebtoken'
import { MongooseQueryParser } from 'mongoose-query-parser';
import { validationResult } from 'express-validator';
import { log } from '../../utils/logger'
import conf from '../../core/config'

const auth = require('../middleware/auth')

export const parser = new MongooseQueryParser()

export const generateToken = verificationString => {
  return auth.encrypt(
    jwt.sign(
      {
        data: {
          _id: verificationString
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * conf.get('JWT_EXPIRATION_IN_DAYS'))
      },
      conf.get('JWT_SECRET')
    )
  )
}

/**
 * Removes extension from file
 * @param {string} file - filename
 */
export const removeExtensionFromFile = file => {
  return file
    .split('.')
    .slice(0, -1)
    .join('.')
    .toString()
}

/**
 * Gets IP from user
 * @param {*} req - request object
 */
export const getIP = req => requestIp.getClientIp(req)

/**
 * Gets browser info from user
 * @param {*} req - request object
 */
export const getBrowserInfo = req => req.headers['user-agent']

/**
 * Gets country from user using CloudFlare header 'cf-ipcountry'
 * @param {*} req - request object
 */
export const getCountry = req =>
  req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'CoeusAPI'

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
export const handleError = (res, err) => {
  // To Winston...
  if (conf.get('IS_DEV')) {
    log.error(err)
  }
  // To client
  res.status(err.code).json({
    success: false,
    errors: {
      msg: err.message
    }
  })
}

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
export const buildErrObject = (code, message) => {
  return {
    success: false,
    code,
    message
  }
}

/**
 * Builds success object
 * @param {string} message - success text
 */
export const buildSuccObject = result => {
  return {
    success: true,
    data: result
  }
}

/**
 * Builds error for validation files
 * @param {Object} req - request object
 * @param {Object} res - response object
 * @param {Object} next - next object
 */
export const theValidationResult = (req, res, next) => {
  try {
    validationResult(req).throw()
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase()
    }
    return next()
  } catch (err) {
    return handleError(res, buildErrObject(422, err.array()))
  }
}



/**
 * Checks if given ID is good for MongoDB
 * @param {string} id - id to check
 */
export const isIDGood = async id => {
  return new Promise((resolve, reject) => {
    const goodID = String(id).match(/^[0-9a-fA-F]{24}$/)
    return goodID
      ? resolve(id)
      : reject(buildErrObject(422, 'ID_MALFORMED'))
  })
}

/**
 * Item not found
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {Object} reject - reject object
 * @param {string} message - message
 */
export const itemNotFound = (err, item, reject, message) => {
  if (err) {
    reject(buildErrObject(422, err.message))
  }
  if (!item) {
    reject(buildErrObject(404, message))
  }
}

/**
 * Item already exists
 * @param {Object} err - error object
 * @param {Object} item - item result object
 * @param {Object} reject - reject object
 * @param {string} message - message
 */
export const itemAlreadyExists = (err, item, reject, message) => {
  if (err) {
    reject(buildErrObject(422, err.message))
  }
  if (item) {
    reject(buildErrObject(422, message))
  }
}

/**
 * Gets verification string from encrypted token
 * @param {string} token - Encrypted and encoded token
 */
export const verifyTheToken = async token => {
  return new Promise((resolve, reject) => {
    // Decrypts, verifies and decode token
    jwt.verify(auth.decrypt(token), conf.get('JWT_SECRET'), (err, decoded) => {
      if (err) {
        reject(buildErrObject(409, 'BAD_TOKEN'))
      }
      resolve(decoded.data._id)
    })
  })
}
