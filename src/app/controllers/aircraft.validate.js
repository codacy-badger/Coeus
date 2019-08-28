import { check } from 'express-validator'
import { theValidationResult } from '../middleware/utils'



/**
 * Validates create new item request
 */
export const createCheck = [
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
export const updateCheck = [
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
export const getCheck = [
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
export const deleteCheck = [
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
