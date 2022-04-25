import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

import { RequestValidationErrors } from '../../errors/RequestValidationErrors';

const validateCDICreation = [
  check('sSecurityName').trim().notEmpty().withMessage('Missing sSecurityName fild'),
  check('dtDate').isDate().withMessage('dtDate must be a valid date'),
  check('dLastTradePrice').trim().isNumeric().withMessage('dLastTradePrice must be numeric'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new RequestValidationErrors(errors.array());
    }

    return next();
  },
];

export { validateCDICreation };
