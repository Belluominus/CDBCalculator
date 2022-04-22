import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { IHashProvider } from '../../../../shared/container/HashProvider/IHashProvider';
import { BadRequestError } from '../../../../shared/errors/BadRequestError';
import { User } from '../../models/user';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Email or password incorrect');
    }

    const passwordMatch = await this.hashProvider.compareData(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestError('Email or password incorrect');
    }

    const token = sign({}, auth.secret_token, {
      subject: user.email,
      expiresIn: auth.expires_in_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
