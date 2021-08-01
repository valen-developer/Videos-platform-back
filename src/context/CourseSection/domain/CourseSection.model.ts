import { UUID } from '../../shared/domain/valueObjects/uuid.valueObject';
import { Video } from '../../Video/domain/video.model';
import { CourseSectionTitle } from './valueObject/CourseSectionTitle.valueObject';

export class CourseSection {
  public readonly uuid: UUID;
  public readonly title: CourseSectionTitle;
  public videos: Video[] = [];

  constructor(section: CourseSectionObject) {
    this.uuid = new UUID(section.uuid);
    this.title = new CourseSectionTitle(section.title);
    this.videos = section.videos ?? [];
  }

  get duration() {
    let duration = 0;
    this.videos.forEach((v) => (duration += v.duration.value));
    return duration;
  }

  public toObject(): CourseSectionObject {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      duration: this.duration,
      videos: this.videos,
    };
  }

  public toObjectVideosUuid(): CourseSectionObjectOnlyVideoUUID {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      duration: this.duration,
      videos: this.videos.map((v) => v.uuid.value),
    };
  }
}

export interface CourseSectionObject {
  uuid: string;
  title: string;
  videos: Video[];
  duration?: number;
}

export interface CourseSectionObjectOnlyVideoUUID {
  uuid: string;
  title: string;
  videos: string[];
  duration: number;
}
