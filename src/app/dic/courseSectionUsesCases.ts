import { IOC } from 'dic-ioc';

import { CourseSectionCreator } from '../../context/CourseSection/application/CourseSectionCreator';
import { CourseSectionFinder } from '../../context/CourseSection/application/CourseSectionFinder';
import { CourseSectionRepository } from '../../context/CourseSection/domain/interfaces/CourseSectionRepository';
import { VideoFinder } from '../../context/Video/application/VideoFinder';
import { Repositories } from './repositories.injector';
import { VideosUsesCases } from './videoUsesCases';

export enum CourseSectionUsesCases {
  CourseSectionFinder = 'CourseSectionFinder',
  CourseSectionCreator = 'CourseSectionCreator',
}

export const injectCourseSectionUsesCases = (container: IOC): IOC => {
  const courseSectionRepository: CourseSectionRepository = container.get(
    Repositories.CourseSectionRepository
  );
  const videoFinder: VideoFinder = container.get(VideosUsesCases.VideoFinder);

  container.setService(
    CourseSectionUsesCases.CourseSectionFinder,
    () => new CourseSectionFinder(courseSectionRepository, videoFinder)
  );

  container.setService(
    CourseSectionUsesCases.CourseSectionCreator,
    () => new CourseSectionCreator(courseSectionRepository)
  );

  return container;
};
