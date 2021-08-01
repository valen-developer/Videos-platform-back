import { IOC } from 'dic-ioc';
import { CourseCreator } from '../../context/Course/application/CourseCreator';
import { CourseFinder } from '../../context/Course/application/CourseFinder';
import { CourseFolderUpdater } from '../../context/Course/application/CourseFolderUpdater';
import { CourseRepository } from '../../context/Course/domain/interfaces/CourseRepository';
import { CourseSectionUsesCases } from './courseSectionUsesCases';
import { Repositories } from './repositories.injector';
import { UtilDependencies } from './utils.injector';
import { VideosUsesCases } from './videoUsesCases';

export enum CourseUsesCases {
  CourseCreator = 'CourseCreator',
  CourseFinder = 'CourseFinder',
  CourseFolderUpdater = 'CourseFolderUpdater',
}

export const injectCourseUsesCases = (container: IOC): IOC => {
  const courseRepository: CourseRepository = container.get(
    Repositories.CourseRepository
  );

  container.setService(
    CourseUsesCases.CourseCreator,
    () => new CourseCreator(courseRepository)
  );

  container.setService(
    CourseUsesCases.CourseFinder,
    (c) =>
      new CourseFinder(
        courseRepository,
        c.get(VideosUsesCases.VideoFinder),
        c.get(CourseSectionUsesCases.CourseSectionFinder)
      )
  );

  container.setService(
    CourseUsesCases.CourseFolderUpdater,
    (c) =>
      new CourseFolderUpdater(
        c.get(UtilDependencies.VideoDuration),
        c.get(UtilDependencies.UuidGenerator)
      )
  );

  return container;
};
