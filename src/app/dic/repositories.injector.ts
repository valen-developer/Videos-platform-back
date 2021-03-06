import { IOC } from 'dic-ioc';

import { MongoCourseRepository } from '../../context/Course/infrastructure/MongoCourseRepository/MongoCourseRepository';
import { MongoCourseSectionRepository } from '../../context/CourseSection/infrastructure/MongoCourseSectionRepository/MongoCourseSectionRepository';
import { MongoUserRepository } from '../../context/User/infrastructure/MongoUserRepository/MongoUserRepository';
import { RedisUserCacheRepository } from '../../context/User/infrastructure/RedisUserCacheRepository';
import { MongoVideoRepository } from '../../context/Video/infrastructure/MongoVideoRepository/MongoVideoRepository';

export const enum Repositories {
  UserRepository = 'UserRepository',
  UserCacheRepository = 'UserCacheRepository',
  VideoRepository = 'VideoRepository',
  CourseRepository = 'CourseRepository',
  CourseSectionRepository = 'CourseSectionRepository',
}

export const injectRepositories = (container: IOC): IOC => {
  container.setService(
    Repositories.UserRepository,
    () => new MongoUserRepository()
  );

  container.setService(
    Repositories.VideoRepository,
    () => new MongoVideoRepository()
  );

  container.setService(
    Repositories.CourseRepository,
    () => new MongoCourseRepository()
  );

  container.setService(
    Repositories.CourseSectionRepository,
    () => new MongoCourseSectionRepository()
  );

  container.setService(
    Repositories.UserCacheRepository,
    () => new RedisUserCacheRepository()
  );

  return container;
};
