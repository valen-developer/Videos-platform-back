import { HTTPException } from '../../shared/domain/HTTPException';
import { VideoRepository } from '../domain/interfaces/VideoRepository.interface';
import { Video } from '../domain/video.model';

export class VideoUpdater {
  constructor(private videoRepository: VideoRepository) {}

  public async update(video: Video): Promise<Video> {
    const videoObject = await this.videoRepository.update(video);

    if (!videoObject)
      throw new HTTPException('video updater', 'video not found', 404);

    return new Video({
      uuid: videoObject.uuid,
      title: videoObject.title,
      duration: videoObject.duration,
      path: videoObject.path,
    });
  }
}
