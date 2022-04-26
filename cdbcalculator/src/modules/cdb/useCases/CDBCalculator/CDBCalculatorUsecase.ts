import moment from 'moment';
import { injectable } from 'tsyringe';

import { BadRequestError } from '../../../../shared/errors/BadRequestError';
import { CDI } from '../../models/cdi';

interface IResponse {
  date: Date;
  unitPrice: number;
}
interface IRequest {
  investmentDate: string;
  cdbRate: string;
  currentDate: string;
}
@injectable()
class CDBCalculatorUsecase {
  async execute({ investmentDate, cdbRate, currentDate }: IRequest): Promise<IResponse[]> {
    const CDBList: IResponse[] = [];

    const investDate = moment(investmentDate, 'YYYY-MM-DD');
    const curDate = moment(currentDate, 'YYYY-MM-DD');

    const TCDB = +cdbRate;

    const dateDif = curDate.diff(investDate, 'days');

    if (dateDif < 0) {
      throw new BadRequestError("currentDate can't be less then investmentDate");
    }
    let CDIac = 1;
    let cont = 0;
    do {
      let dateToCalc = moment(investmentDate, 'YYYY-MM-DD');

      dateToCalc = dateToCalc.add(cont, 'days');
      const formatedDate = dateToCalc.format('YYYY-MM-DD');

      const existCDI = await CDI.findOne({ sSecurityName: 'CDI', dtDate: formatedDate });

      if (existCDI) {
        const formatedPrice: number = +existCDI.dLastTradePrice;
        const CDIk = (formatedPrice / 100 + 1) ** 0.003968253968254 - 1;
        const resultRounded = parseFloat(CDIk.toFixed(8));
        const CDIAcumulado = 1 + (resultRounded * TCDB) / 100;

        CDIac *= CDIAcumulado;

        CDBList.push({
          date: new Date(formatedDate),
          unitPrice: CDIac,
        });
      }
      cont += 1;
    } while (cont <= dateDif);

    return CDBList;
  }
}

export { CDBCalculatorUsecase };
