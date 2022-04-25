import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CreateCDIUseCase } from './CreateCDIUseCase';

class CreateCDIController {
  async handle(request: Request, response: Response) {
    const { sSecurityName, dtDate, dLastTradePrice } = request.body;

    const createCDIUseCase = container.resolve(CreateCDIUseCase);

    await createCDIUseCase.execute({ sSecurityName, dtDate, dLastTradePrice });

    response.status(201).send();
  }
}

export { CreateCDIController };
