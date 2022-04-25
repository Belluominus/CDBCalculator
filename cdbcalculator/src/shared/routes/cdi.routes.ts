import { Router } from 'express';
import multer from 'multer';

import upliadConfig from '../../config/upload';
import { CDBCalculatorController } from '../../modules/cdb/useCases/CDBCalculator/CDBCalculatorController';
import { CreateCDIController } from '../../modules/cdb/useCases/createCDI/CreateCDIController';
import { ImportCDIController } from '../../modules/cdb/useCases/importCDI/ImportCDIController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { validateCDBCalculate } from '../middlewares/validator/validateCDBCalculate';
import { validateCDICreation } from '../middlewares/validator/validateCDICreation';

const cdiRoutes = Router();

const upload = multer(upliadConfig.upload('./tmp'));

const createCDIController = new CreateCDIController();
const importCDIController = new ImportCDIController();
const cDBCalculatorController = new CDBCalculatorController();

cdiRoutes.post('/import', upload.single('file'), ensureAuthenticated, importCDIController.handle);
cdiRoutes.post('/create', ensureAuthenticated, validateCDICreation, createCDIController.handle);
cdiRoutes.post('/calculatecdb', validateCDBCalculate, cDBCalculatorController.handle);
export { cdiRoutes };
