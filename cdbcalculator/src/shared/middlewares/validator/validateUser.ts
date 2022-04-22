import { Request, Response, NextFunction } from 'express';
import { validationResult, check } from 'express-validator';

import { RequestValidationErrors } from '../../errors/RequestValidationErrors';

const validateUser = [
  check('name').trim().isLength({ min: 8 }).withMessage('Name must have at least 8 characters'),
  check('email').isEmail().withMessage('Email must be valid'),
  check('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters'),
  (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      //   return response.status(400).send(errors.array());
      throw new RequestValidationErrors(errors.array());
    }

    return next();
  },
];

export { validateUser };
