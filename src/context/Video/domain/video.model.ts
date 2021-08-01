import { UUID } from '../../shared/domain/valueObjects/uuid.valueObject';
import { VideoDuration } from './valueObjects/VideoDuration.valueObject';
import { VideoPath } from './valueObjects/VideoPath.valueObject';
import { VideoTitle } from './valueObjects/VideoTitle.valueObject';

export class Video {
  public readonly uuid: UUID;
  public readonly title: VideoTitle;
  public readonly duration: VideoDuration;
  public readonly path: VideoPath;

  constructor(video: VideoObject) {
    this.uuid = new UUID(video.uuid);
    this.title = new VideoTitle(video.title);
    this.duration = new VideoDuration(video.duration);
    this.path = new VideoPath(video.path);
  }

  public toObject(): VideoObject {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      duration: this.duration.value,
      path: this.path.value,
    };
  }
}

export interface VideoObject {
  uuid: string;
  title: string;
  duration: number;
  path: string;
}
