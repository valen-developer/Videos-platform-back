import { Request, Response } from 'express';

import { CourseFinder } from '../../../context/Course/application/CourseFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { CourseUsesCases } from '../../dic/courseUsesCases';
import { getContainer } from '../../dic/getContainer';
import { Controller } from '../controlles.interface';

export class GetAllCoursesController implements Controller {
  public async run(req: Request, res: Response) {
    try {
      const container = getContainer();
      const courseFinder: CourseFinder = container.get(
        CourseUsesCases.CourseFinder
      );

      const courses = await courseFinder.getAll();

      res.json({ ok: true, courses });
    } catch (error) {
      errorHandler(res, error, 'get all courses');
    }
  }
}
