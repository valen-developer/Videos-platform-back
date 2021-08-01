import { Request, Response } from 'express';
import { CourseFinder } from '../../../context/Course/application/CourseFinder';
import { HTTPException } from '../../../context/shared/domain/HTTPException';
import { errorHandler } from '../../../helpers/errorHandler';
import { CourseUsesCases } from '../../dic/courseUsesCases';
import { getContainer } from '../../dic/getContainer';
import { Controller } from '../controlles.interface';

export class GetCourseController implements Controller {
  public async run(req: Request, res: Response) {
    const { courseUuid } = req.query;

    try {
      if (!courseUuid)
        throw new HTTPException(
          'get course controller',
          'course not provided',
          400
        );

      const container = getContainer();
      const courseFinder: CourseFinder = container.get(
        CourseUsesCases.CourseFinder
      );

      const course = await courseFinder.get(courseUuid as string);

      res.json({
        ok: true,
        course: {
          ...course.toObject(),
          videos: course.videos.map((v) => v.toObject()),
          sections: course.sections.map((s) => s.toObject()),
        },
      });
    } catch (error) {
      errorHandler(res, error, 'get course controller');
    }
  }
}
