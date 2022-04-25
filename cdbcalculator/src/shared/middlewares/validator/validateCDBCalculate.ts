import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

import { RequestValidationErrors } from '../../errors/RequestValidationErrors';

const validateCDBCalculate = [
  check('investmentDate').isDate().withMessage('investmentDate must be a valid date and be in US format'),
  check('cdbRate').trim().isNumeric().withMessage('cdbRate must be numeric'),
  check('currentDate').isDate().withMessage('currentDate must be a valid date and be in US format'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new RequestValidationErrors(errors.array());
    }

    return next();
  },
];

export { validateCDBCalculate };
