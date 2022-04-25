import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../config/auth';
import { User } from '../../modules/accounts/models/user';
import { UnathorizedError } from '../errors/UnathorizedError';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new UnathorizedError('Missing Token');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub: email } = verify(token, auth.secret_token);

    if (typeof email === 'string') {
      const user = await User.findOne({ email });

      if (!user) {
        throw new UnathorizedError('User dos not existis!');
      }

      request.user = {
        email,
      };

      next();
    } else {
      throw new UnathorizedError('Invalid token!');
    }
  } catch (error) {
    throw new UnathorizedError('Invalid token!');
  }
}
