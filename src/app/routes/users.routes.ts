import { Router } from 'express';
import { ToggleActivateUserController } from '../controllers/users/ActivatedUser.controller';
import { DeleteUserController } from '../controllers/users/DeleteUser.controller';
import { GetAllUsersController } from '../controllers/users/GetAllUsers.controller';
import { VerifyROLEMiddleware } from '../middlewares/VerifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';

export const usersRouter = Router();

// Middlewares
const verifyRoleMiddleware = new VerifyROLEMiddleware();
const verifyTokenMiddleware = new VerifyTokenMiddleware();

// Controllers
const getAllUsersController = new GetAllUsersController();
const toggleActivationUserController = new ToggleActivateUserController();
const deleteUserController = new DeleteUserController();

usersRouter.get(
  '/user/all',
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  getAllUsersController.run
);

usersRouter.post(
  '/user/validation',
  [verifyRoleMiddleware.run, verifyTokenMiddleware.run],
  toggleActivationUserController.run
);

usersRouter.delete(
  '/user',
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  deleteUserController.run
);
