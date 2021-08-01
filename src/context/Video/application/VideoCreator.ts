import { VideoRepository } from '../domain/interfaces/VideoRepository.interface';
import { Video } from '../domain/video.model';

export class VideoCreator {
  constructor(private videoRepository: VideoRepository) {}

  public async create(video: Video): Promise<Video> {
    await this.videoRepository.create(video);
    return video;
  }
}
