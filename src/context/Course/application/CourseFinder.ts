import { CourseSectionFinder } from '../../CourseSection/application/CourseSectionFinder';
import { HTTPException } from '../../shared/domain/HTTPException';
import { VideoFinder } from '../../Video/application/VideoFinder';
import { Video } from '../../Video/domain/video.model';
import { Course, CourseObjectOnlyUuid } from '../domain/Course.model';
import { CourseRepository } from '../domain/interfaces/CourseRepository';

export class CourseFinder {
  constructor(
    private courseRepository: CourseRepository,
    private videoFinder: VideoFinder,
    private sectionsFinder: CourseSectionFinder
  ) {}

  public async get(uuid: string): Promise<Course> {
    const courseObject = await this.courseRepository.get(uuid);

    console.log(courseObject);

    if (!courseObject)
      throw new HTTPException(
        'course finder: get by uuid',
        'course not found',
        404
      );

    const videos = await Promise.all(
      courseObject.videos?.map(async (v) => {
        return await this.videoFinder.getByUuid(v);
      }) ?? []
    );

    const sections = await Promise.all(
      courseObject.sections?.map(async (s) => {
        return await this.sectionsFinder.get(s);
      }) ?? []
    );

    return new Course({
      uuid: courseObject.uuid,
      title: courseObject.title,
      description: courseObject.description,
      imagePath: courseObject.imagePath,
      videos,
      sections,
    });
  }

  public async getAll(): Promise<CourseObjectOnlyUuid[]> {
    return await this.courseRepository.getAll();
  }
}
