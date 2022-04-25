import { CustomError } from './CustomError';

export class UnathorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UnathorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: this.message }];
  }
}
