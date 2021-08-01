import {
  CourseSection,
  CourseSectionObjectOnlyVideoUUID,
} from '../CourseSection.model';

// TODO: delete
export interface CourseSectionRepository {
  create(section: CourseSection): Promise<void>;
  get(uuid: string): Promise<CourseSectionObjectOnlyVideoUUID>;
}
