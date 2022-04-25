import { parse } from 'csv-parse';
import fs from 'fs';
import moment from 'moment';
import { injectable } from 'tsyringe';

import { BadRequestError } from '../../../../shared/errors/BadRequestError';
import { CDI } from '../../models/cdi';

interface IImportCDI {
  sSecurityName: string;
  dtDate: string;
  dLastTradePrice: string;
}

@injectable()
class ImportCDIUseCase {
  loadCDIs(file: Express.Multer.File): Promise<IImportCDI[]> {
    return new Promise((resolve, reject) => {
      const CDI: IImportCDI[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async (line) => {
          const [sSecurityName, dtDate, dLastTradePrice] = line;

          CDI.push({
            sSecurityName,
            dtDate,
            dLastTradePrice,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(CDI);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File | undefined) {
    if (!file) {
      throw new BadRequestError('Missing file to import');
    }
    const CDIList = await this.loadCDIs(file);

    await Promise.all(
      CDIList.map(async (cdi) => {
        const { sSecurityName, dtDate, dLastTradePrice } = cdi;

        const parsedDate = moment(dtDate, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const existCDI = await CDI.findOne({ sSecurityName, parsedDate });

        if (!existCDI) {
          const newcdi = CDI.build({ sSecurityName, dtDate: parsedDate, dLastTradePrice });

          await newcdi.save();

          return 'New CDI Created';
        }

        await CDI.deleteOne({ sSecurityName, dtDate });

        const newcdi = CDI.build({ sSecurityName, dtDate: parsedDate, dLastTradePrice });

        await newcdi.save();

        return 'Old CDI Updated';
      }),
    );
  }
}

export { ImportCDIUseCase };
