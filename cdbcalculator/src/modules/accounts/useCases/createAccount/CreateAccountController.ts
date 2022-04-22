import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateAccountUseCase } from './CreateAccountUseCase';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const ceateAccountUseCase = container.resolve(CreateAccountUseCase);

    const singUpData = await ceateAccountUseCase.execute({ name, email, password });

    return response.status(201).send(singUpData);
  }
}

export { CreateAccountController };
