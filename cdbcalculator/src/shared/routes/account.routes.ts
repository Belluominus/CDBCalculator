import { Router } from 'express';

import { AuthenticateUserController } from '../../modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { CreateAccountController } from '../../modules/accounts/useCases/createAccount/CreateAccountController';
import { validateUserAuthentication } from '../middlewares/validator/validateUserAuthentication';
import { validateUserCreation } from '../middlewares/validator/validateUserCreation';

const accountRouter = Router();

const createAccountController = new CreateAccountController();
const authenticateUserController = new AuthenticateUserController();

accountRouter.post('/create', validateUserCreation, createAccountController.handle);
accountRouter.post('/authenticate', validateUserAuthentication, authenticateUserController.handle);

export { accountRouter };
