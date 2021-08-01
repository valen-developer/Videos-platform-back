import { Router } from 'express';
import { authRouter } from './auth.routes';
import { courseRouter } from './courses.routes';
import { usersRouter } from './users.routes';
import { videoRouter } from './videos.routes';

export const router: Router = Router();

router.use('/api', authRouter);
router.use('/api/user', usersRouter);
router.use('/api', courseRouter);
router.use('/api', videoRouter);
