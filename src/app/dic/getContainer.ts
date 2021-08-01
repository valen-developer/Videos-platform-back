import { IOC } from 'dic-ioc';
import { injectCourseSectionUsesCases } from './courseSectionUsesCases';
import { injectCourseUsesCases } from './courseUsesCases';

import { injectRepositories } from './repositories.injector';
import { injectUserUsesCases } from './userUseCases.injector';
import { injectUtils } from './utils.injector';
import { injectVideosUsesCases } from './videoUsesCases';

export const getContainer = (): IOC => {
  let container = new IOC();

  container = injectRepositories(container);
  container = injectUtils(container);

  container = injectUserUsesCases(container);

  container = injectVideosUsesCases(container);
  container = injectCourseSectionUsesCases(container);
  container = injectCourseUsesCases(container);

  return container;
};
