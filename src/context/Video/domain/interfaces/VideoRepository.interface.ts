import { Video, VideoObject } from '../video.model';

export interface VideoRepository {
  create(video: Video): Promise<void>;
  update(video: Video): Promise<VideoObject>;
  delete(uuid: string): Promise<void>;
  get(uuid: string): Promise<VideoObject>;
}
