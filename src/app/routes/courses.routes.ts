import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import { GetAllCoursesController } from '../controllers/courses/GetAllCourses.controller';
import { GetCourseController } from '../controllers/courses/GetCourse.controller';
import { GetCoursePosterController } from '../controllers/courses/GetCoursePoster.controller';
import { UpdateCourseImageController } from '../controllers/courses/UpdateCourseImage.controller';
import { UpdateCoursesFolderController } from '../controllers/courses/UpdateCoursesFolder.controller';

import { VerifyROLEMiddleware } from '../middlewares/VerifyRole.middleware';
import { VerifyTokenMiddleware } from '../middlewares/VerifyToken.middleware';

export const courseRouter = Router();

// Middlewares
const verifyTokenMiddleware = new VerifyTokenMiddleware();
const verifyRoleMiddleware = new VerifyROLEMiddleware();

// Controllers
const coursefolderUpdaterController = new UpdateCoursesFolderController();
const getAllCoursesController = new GetAllCoursesController();
const getCourseController = new GetCourseController();
const updateImageController = new UpdateCourseImageController();
const posterController = new GetCoursePosterController();

courseRouter.put(
  '/course/image',
  [verifyTokenMiddleware.run],
  updateImageController.run
);

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

courseRouter.get(
  '/course/poster',
  [verifyTokenMiddleware.run],
  posterController.run
);

courseRouter.get(
  '/course',
  [verifyTokenMiddleware.run],
  getCourseController.run
);
