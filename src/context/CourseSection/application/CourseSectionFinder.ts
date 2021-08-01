import { HTTPException } from '../../shared/domain/HTTPException';
import { VideoFinder } from '../../Video/application/VideoFinder';
import { Video } from '../../Video/domain/video.model';
import { CourseSection } from '../domain/CourseSection.model';
import { CourseSectionRepository } from '../domain/interfaces/CourseSectionRepository';

export class CourseSectionFinder {
  constructor(
    private courseSectionRepository: CourseSectionRepository,
    private videoFinder: VideoFinder
  ) {}

  public async get(uuid: string): Promise<CourseSection> {
    const sectionObject = await this.courseSectionRepository.get(uuid);

    if (!sectionObject)
      throw new HTTPException('course section get', 'section not found', 404);

    const videos = await Promise.all(
      sectionObject.videos.map(async (vUuid) => {
        const video = await this.videoFinder.getByUuid(vUuid);
        return video;
      })
    );

    return new CourseSection({
      uuid: sectionObject.uuid,
      title: sectionObject.title,
      videos: videos,
    });
  }
}
