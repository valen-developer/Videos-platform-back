import { HTTPException } from '../../../shared/domain/HTTPException';
import { Course, CourseObjectOnlyUuid } from '../../domain/Course.model';
import { CourseRepository } from '../../domain/interfaces/CourseRepository';
import { CourseMongoModel } from './mongoCourseModel';

export class MongoCourseRepository implements CourseRepository {
  public async create(course: Course): Promise<void> {
    const courseMongo = new CourseMongoModel(course.toObjectWithVideosUuid());

    try {
      await courseMongo.save();
    } catch (error) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo course repository:save ',
          'server error',
          500
        );
      }

      const keys = Object.keys(keyPattern);
      throw new HTTPException(
        'mongo course repository:save ',
        `${keys[0]} already exist`,
        400
      );
    }
  }

  public async getAll(): Promise<CourseObjectOnlyUuid[]> {
    try {
      const courses = await CourseMongoModel.find();
      return courses as CourseObjectOnlyUuid[];
    } catch (error) {
      return [];
    }
  }

  public async get(uuid: string): Promise<CourseObjectOnlyUuid> {
    try {
      const course = await CourseMongoModel.findOne({ uuid });
      return course as CourseObjectOnlyUuid;
    } catch (error) {
      throw new HTTPException(
        'mongo course repository: get by uuid',
        'course not found',
        404
      );
    }
  }
}
