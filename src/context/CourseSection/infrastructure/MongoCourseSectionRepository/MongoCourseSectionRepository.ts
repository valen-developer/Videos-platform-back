import { HTTPException } from '../../../shared/domain/HTTPException';
import {
  CourseSection,
  CourseSectionObjectOnlyVideoUUID,
} from '../../domain/CourseSection.model';
import { CourseSectionRepository } from '../../domain/interfaces/CourseSectionRepository';
import { CourseSectionMongoModel } from './MongoCourseSectionModel';

export class MongoCourseSectionRepository implements CourseSectionRepository {
  public async create(section: CourseSection): Promise<void> {
    const sectionMongo = new CourseSectionMongoModel(
      section.toObjectVideosUuid()
    );

    try {
      await sectionMongo.save();
    } catch (error) {
      console.log(error);
      const keyPattern = error.keyPattern;
      if (!keyPattern) {
        throw new HTTPException(
          'mongo course section repository:create ',
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

  public async get(uuid: string): Promise<CourseSectionObjectOnlyVideoUUID> {
    try {
      return await CourseSectionMongoModel.findOne({ uuid });
    } catch (error) {
      console.log(error);
      throw new HTTPException(
        'mongo course section repository: get by uuid',
        'section not found',
        404
      );
    }
  }
}
