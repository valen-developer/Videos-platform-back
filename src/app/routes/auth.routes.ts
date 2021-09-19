import { Router } from 'express';
import { SignUpController } from '../controllers/auth/SignUp.controller';
import { SetPasswordController } from '../controllers/auth/SetPasswordController';
import { SigninController } from '../controllers/auth/Singin.controller';
import { VerifyROLEMiddleware } from '../middlewares/VerifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';
import { BecomeAdminController } from '../controllers/auth/BecomeAdmin.controller';
import { SigninTokenController } from '../controllers/auth/SigninToken';

export const authRouter = Router();

// Middlewares
const verifyRoleMiddleware = new VerifyROLEMiddleware();
const verifyTokenMiddleware = new VerifyTokenMiddleware();

// Controllers
const signUpController = new SignUpController();
const setPasswordController = new SetPasswordController();
const signinController = new SigninController();
const siginTokenController = new SigninTokenController();
const becomeAdminController = new BecomeAdminController();

authRouter.post('/signup', signUpController.run);
authRouter.post('/signup/password', setPasswordController.run);

authRouter.post('/signin', signinController.run);
authRouter.post(
  '/signin/token',
  [verifyTokenMiddleware.run],
  siginTokenController.run
);

authRouter.patch(
  '/useradmin',
  [verifyRoleMiddleware.run, verifyTokenMiddleware.run],
  becomeAdminController.run
);
