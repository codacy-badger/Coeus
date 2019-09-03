import { check } from 'express-validator'
import { theValidationResult } from '~/middleware/utils'


/**
 * Validates create new item request
 */
export const checkCreateAircraft = [
  check('registration')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .trim(),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]

/**
 * Validates update item request
 */
export const checkAircraftUpdate = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]

/**
 * Validates get item request
 */
export const checkGetAircraft = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]

/**
 * Validates delete item request
 */
export const checkDeleteAircraft = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]

export const checkRestoreAircraft = [
  check('id')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]
