import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors/CustomError';

const errorHandler = (err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    return response.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return response.status(500).send({ errors: [{ message: `Internal server error ${err.message}` }] });
};

export { errorHandler };
