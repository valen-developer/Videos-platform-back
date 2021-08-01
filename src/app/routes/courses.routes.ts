import { Router } from 'express';
import { GetAllCoursesController } from '../controllers/courses/GetAllCourses.controller';
import { GetCourseController } from '../controllers/courses/GetCourse.controller';
import { UpdateCoursesController } from '../controllers/courses/UpdateCourses.controller';
import { VerifyROLEMiddleware } from '../middlewares/VerifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';

export const courseRouter = Router();

// Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware();
const verifyRoleMiddleware = new VerifyROLEMiddleware();

// Controllers
const coursefolderUpdaterController = new UpdateCoursesController();
const getAllCoursesController = new GetAllCoursesController();
const getCourseController = new GetCourseController();

courseRouter.post(
  '/course/updatefolder',
  [verifyTokenMiddleware.run, verifyRoleMiddleware.run],
  coursefolderUpdaterController.run
);
courseRouter.get(
  '/course/all',
  [verifyTokenMiddleware.run],
  getAllCoursesController.run
);

courseRouter.get('/course', getCourseController.run);
