import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ImportCDIUseCase } from './ImportCDIUseCase';

class ImportCDIController {
  async handle(request: Request, response: Response) {
    const { file } = request;

    const importCDIUseCase = container.resolve(ImportCDIUseCase);

    await importCDIUseCase.execute(file);

    response.status(201).send();
  }
}

export { ImportCDIController };
