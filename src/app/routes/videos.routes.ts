import { Router } from 'express';
import { GetVideoController } from '../controllers/videos/GetVideoController.controller';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';

export const videoRouter = Router();

// Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware();

// Controllers
const getVideoController = new GetVideoController();

videoRouter.get('/video', [verifyTokenMiddleware.run], getVideoController.run);
