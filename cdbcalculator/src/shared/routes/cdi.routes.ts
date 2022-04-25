import { Router } from 'express';
import multer from 'multer';

import upliadConfig from '../../config/upload';
import { CreateCDIController } from '../../modules/cdi/useCases/createCDI/CreateCDIController';
import { ImportCDIController } from '../../modules/cdi/useCases/importCDI/ImportCDIController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const cdiRoutes = Router();

const upload = multer(upliadConfig.upload('./tmp'));

const createCDIController = new CreateCDIController();
const importCDIController = new ImportCDIController();

cdiRoutes.post('/import', upload.single('file'), ensureAuthenticated, importCDIController.handle);
cdiRoutes.post('/create', ensureAuthenticated, createCDIController.handle);

export { cdiRoutes };
