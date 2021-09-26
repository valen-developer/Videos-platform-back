import { Request, Response } from 'express';

import { CourseCreator } from '../../../context/Course/application/CourseCreator';
import { CourseFolderUpdater } from '../../../context/Course/application/CourseFolderUpdater';
import { CourseSectionCreator } from '../../../context/CourseSection/application/CourseSectionCreator';
import { VideoCreator } from '../../../context/Video/application/VideoCreator';
import { errorHandler } from '../../../helpers/errorHandler';
import { CourseSectionUsesCases } from '../../dic/courseSectionUsesCases';
import { CourseUsesCases } from '../../dic/courseUsesCases';
import { getContainer } from '../../dic/getContainer';
import { VideosUsesCases } from '../../dic/videoUsesCases';
import { Controller } from '../controlles.interface';

export class UpdateCoursesFolderController implements Controller {
  public async run(req: Request, res: Response) {
    try {
      const container = getContainer();
      const courseFolderUpdater: CourseFolderUpdater = container.get(
        CourseUsesCases.CourseFolderUpdater
      );

      const courses = await courseFolderUpdater.update();

      const courseCreator: CourseCreator = container.get(
        CourseUsesCases.CourseCreator
      );
      const videoCreator: VideoCreator = container.get(
        VideosUsesCases.VideoCreator
      );
      const sectionCreator: CourseSectionCreator = container.get(
        CourseSectionUsesCases.CourseSectionCreator
      );

      courses.map(async (c) => {
        courseCreator
          .create(c)
          .then(() => {
            c.sections.map(async (s) => {
              sectionCreator.create(s);
              s.videos.forEach((v) => {
                videoCreator.create(v);
              });
            });

            c.videos.map(async (v) => {
              videoCreator.create(v).catch((err) => {
                console.log(err);
              });
            });
          })
          .catch((err) => {
            console.log('El curso ya existe');
          });
      });

      res.json({ ok: true });
    } catch (error) {
      errorHandler(res, error, 'course folder updater');
    }
  }
}
