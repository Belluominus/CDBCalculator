import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

import { RequestValidationErrors } from '../../errors/RequestValidationErrors';

const validateUserAuthentication = [
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').trim().notEmpty().withMessage('Password is needed'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      throw new RequestValidationErrors(errors.array());
    }

    return next();
  },
];

export { validateUserAuthentication };
