import { VideoRepository } from '../domain/interfaces/VideoRepository.interface';

export class VideoEliminator {
  constructor(private videoRepository: VideoRepository) {}

  public async delete(uuid: string): Promise<void> {
    await this.videoRepository.delete(uuid);
  }
}
