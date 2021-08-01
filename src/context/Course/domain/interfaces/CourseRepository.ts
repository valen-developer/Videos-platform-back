import { Course, CourseObjectOnlyUuid } from '../Course.model';

export interface CourseRepository {
  create(course: Course): Promise<void>;
  get(uuid: string): Promise<CourseObjectOnlyUuid>;
  getAll(): Promise<CourseObjectOnlyUuid[]>;
}
