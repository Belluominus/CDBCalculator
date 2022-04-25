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

export { CreateCDIUseCase };
