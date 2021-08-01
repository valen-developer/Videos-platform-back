import { HTTPException } from '../../shared/domain/HTTPException';
import { VideoRepository } from '../domain/interfaces/VideoRepository.interface';
import { Video } from '../domain/video.model';

export class VideoFinder {
  constructor(private videoRepository: VideoRepository) {}

  public async getByUuid(uuid: string): Promise<Video> {
    const videoObject = await this.videoRepository.get(uuid);

    if (!videoObject)
      throw new HTTPException(
        'video finder: get by uuid',
        'video not found',
        404
      );

    return new Video({
      uuid: videoObject.uuid,
      title: videoObject.title,
      duration: videoObject.duration,
      path: videoObject.path,
    });
  }
}
