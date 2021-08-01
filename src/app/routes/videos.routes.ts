import { Router } from 'express';
import { GetVideoController } from '../controllers/videos/GetVideoController.controller';

export const videoRouter = Router();

// Controllers
const getVideoController = new GetVideoController();

videoRouter.get('/video', getVideoController.run);
