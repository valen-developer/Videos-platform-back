import { CourseSection } from '../domain/CourseSection.model';
import { CourseSectionRepository } from '../domain/interfaces/CourseSectionRepository';

export class CourseSectionCreator {
  constructor(private sectionRepository: CourseSectionRepository) {}

  public async create(section: CourseSection): Promise<void> {
    await this.sectionRepository.create(section);
  }
}
