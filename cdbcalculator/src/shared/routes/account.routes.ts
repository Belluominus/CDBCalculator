import { Router } from 'express';

import { AuthenticateUserController } from '../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { CreateAccountController } from '../../modules/accounts/useCases/createAccount/CreateAccountController';
import { validateUser } from '../middlewares/validator/validateUser';

const accountRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateUserController = new AuthenticateUserController();

accountRouter.post('/create', validateUser, createAccountController.handle);
accountRouter.post('/authenticate', validateUser, authenticateUserController.handle);

export { accountRouter };
