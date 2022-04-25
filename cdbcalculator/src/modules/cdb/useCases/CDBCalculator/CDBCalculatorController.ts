import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { CDBCalculatorUsecase } from './CDBCalculatorUsecase';

class CDBCalculatorController {
  async handle(request: Request, response: Response) {
    const { investmentDate, cdbRate, currentDate } = request.body;

    const cDBCalculatorUsecase = container.resolve(CDBCalculatorUsecase);

    const ListCDB = await cDBCalculatorUsecase.execute({ investmentDate, cdbRate, currentDate });

    response.status(200).json(ListCDB);
  }
}

export { CDBCalculatorController };
