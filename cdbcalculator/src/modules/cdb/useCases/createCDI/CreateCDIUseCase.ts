import { injectable } from 'tsyringe';

import { CDI } from '../../models/cdi';

interface IRequest {
  sSecurityName: string;
  dtDate: string;
  dLastTradePrice: string;
}

@injectable()
class CreateCDIUseCase {
  async execute({ sSecurityName, dtDate, dLastTradePrice }: IRequest) {
    const existCDI = await CDI.findOne({ sSecurityName, dtDate });

    if (!existCDI) {
      const newcdi = CDI.build({ sSecurityName, dtDate, dLastTradePrice });

      await newcdi.save();

      return 'New CDI Created';
    }

    await CDI.deleteOne({ sSecurityName, dtDate });

    const newcdi = CDI.build({ sSecurityName, dtDate, dLastTradePrice });

    await newcdi.save();

    return 'Old CDI Updated';
  }
}

// FORMULA 1 + 2

// const formatedPrice: number = +dLastTradePrice;

// const calc = (formatedPrice / 100 + 1) ** 0.003968253968254 - 1;

// const resultRounded = parseFloat(calc.toFixed(8));

// const calc2 = 1 + (resultRounded * 103.5) / 100;

// DATE

// const parsedDate = moment(dtDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

export { CreateCDIUseCase };
