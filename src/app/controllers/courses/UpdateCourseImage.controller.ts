import { request, Request, Response } from 'express';
import formidable from 'formidable';
import path from 'path';

import { Controller } from '../controlles.interface';
import { enviroment } from '../../config/enviroment';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UtilDependencies } from '../../dic/utils.injector';
import { FileUploader } from '../../../context/shared/domain/interfaces/FileUploader';
import { CourseUsesCases } from '../../dic/courseUsesCases';
import { CourseFinder } from '../../../context/Course/application/CourseFinder';
import { CourseUpdater } from '../../../context/Course/application/CourseUpdater';
import { HTTPException } from '../../../context/shared/domain/HTTPException';

export class UpdateCourseImageController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const destinationPath = path.join(enviroment.courseFolderPath, '/courses');

    try {
      const form = formidable({
        multiples: false,
        uploadDir: destinationPath,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) throw new Error('server error');

        const courseUuid = fields.courseUuid as string;
        const file = files.file as formidable.File;

        const container = getContainer();
        const fileUploader: FileUploader = container.get(
          UtilDependencies.FileUploader
        );

        const imagePath = await fileUploader.upload(
          file,
          courseUuid,
          destinationPath
        );

        const courseFinder: CourseFinder = container.get(
          CourseUsesCases.CourseFinder
        );
        const CourseUpdater: CourseUpdater = container.get(
          CourseUsesCases.CourseUpdater
        );

        const course = await courseFinder.get(courseUuid);
        course.setImagePath(imagePath);

        console.log(course);

        await CourseUpdater.update(course);

        res.status(201).json({ ok: true });
      });
    } catch (error) {
      errorHandler(res, error, 'UpdateCourseImageController');
    }
  }
}
