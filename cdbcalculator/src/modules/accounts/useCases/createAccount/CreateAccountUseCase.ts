import { inject, injectable } from 'tsyringe';

import { IHashProvider } from '../../../../shared/container/HashProvider/IHashProvider';
import { BadRequestError } from '../../../../shared/errors/BadRequestError';
import { User } from '../../models/user';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
interface IResponse {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  async execute({ name, email, password }: IRequest): Promise<IResponse> {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const encryptedPassword = await this.hashProvider.encryptData(password);

    const user = User.build({
      name,
      email,
      password: encryptedPassword,
    });

    await user.save();

    return user;
  }
}

export { CreateAccountUseCase };
