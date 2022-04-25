import { Router } from 'express';

import { accountRouter } from './account.routes';
import { cdiRoutes } from './cdi.routes';

const routes = Router();

routes.use('/api/cdi', cdiRoutes);
routes.use('/api/users', accountRouter);

export { routes };
