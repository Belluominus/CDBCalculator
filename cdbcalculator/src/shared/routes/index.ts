import { Router } from 'express';

import { accountRouter } from './account.routes';

const routes = Router();

routes.use('/api/users', accountRouter);

export { routes };
