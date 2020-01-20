// const validator = require('validator')
const { check } = require('express-validator')
const { theValidationResult } = require('~/middleware/utils')

/**
 * Validates verify request
 */
export const checkGetWorkcard = [
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
