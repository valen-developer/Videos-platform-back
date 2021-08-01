import { Router } from 'express';
import { GetAllUsersController } from '../controllers/users/GetAllUsers.controller';
import { VerifyROLEMiddleware } from '../middlewares/VerifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';

export const usersRouter = Router();

// Middlewares
const verifyRoleMiddleware = new VerifyROLEMiddleware();
const verifyTokenMiddleware = new VerifyTokenMiddleware();

// Controllers
const getAllUsersController = new GetAllUsersController();

usersRouter.get(
  '',
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  getAllUsersController.run
);
