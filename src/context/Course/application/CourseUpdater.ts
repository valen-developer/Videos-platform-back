import { Course } from '../domain/Course.model';
import { CourseRepository } from '../domain/interfaces/CourseRepository';

export class CourseUpdater {
  constructor(private courseRepository: CourseRepository) {}

  public async update(course: Course): Promise<void> {
    await this.courseRepository.update(course);
  }
}
