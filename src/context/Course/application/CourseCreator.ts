import { Course } from '../domain/Course.model';
import { CourseRepository } from '../domain/interfaces/CourseRepository';

export class CourseCreator {
  constructor(private courseRepository: CourseRepository) {}

  public async create(course: Course): Promise<void> {
    await this.courseRepository.create(course);
  }
}
