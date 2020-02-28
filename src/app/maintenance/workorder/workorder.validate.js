// const validator = require('validator')
const { check } = require('express-validator')
const { theValidationResult } = require('~/middleware/utils')

/**
 * Validates verify request
 */
export const checkGetWorkorder = [
  check('id')
    .exists()
    .withMessage('No Workorder ID given. Please add.')
    .not()
    .isEmpty()
    .withMessage('Workorder should not be empty'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]

export const addAircraftValidator = [
  check('id')
    .exists()
    .withMessage('No Workcard ID given. Please add.')
    .not()
    .isEmpty()
    .withMessage('Workcard should not be empty'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]


export const updateAircraftValidator = [
  check('id')
    .exists()
    .withMessage('No Workcard ID given. Please add.')
    .not()
    .isEmpty()
    .withMessage('Workcard should not be empty'),
  (req, res, next) => {
    theValidationResult(req, res, next)
  }
]
