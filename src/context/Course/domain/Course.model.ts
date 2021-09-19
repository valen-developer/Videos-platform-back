import { CourseSection } from '../../CourseSection/domain/CourseSection.model';
import { ImagePath } from '../../shared/domain/valueObjects/image.valueObject';
import { UUID } from '../../shared/domain/valueObjects/uuid.valueObject';
import { Video } from '../../Video/domain/video.model';
import { CourseDescription } from './valueObject/CourseDescription.valueObject';
import { CourseDuration } from './valueObject/CourseDuration.valueObject';
import { CourseTitle } from './valueObject/CourseTitle.valueObject';

export class Course {
  public readonly uuid: UUID;
  public readonly title: CourseTitle;
  public readonly description: CourseDescription;
  public readonly imagePath: ImagePath;
  public videos: Video[] = [];
  private _sections: CourseSection[] = [];

  constructor(course: CourseObject) {
    this.uuid = new UUID(course.uuid);
    this.title = new CourseTitle(course.title);
    this.description = new CourseDescription(course.description);
    this.imagePath = new ImagePath(course.imagePath);

    this.videos = course.videos ?? [];
    this._sections = course.sections ?? [];
  }

  get duration() {
    let dur = 0;
    this.videos.forEach((v) => {
      dur += v.duration.value;
    });

    this.sections.forEach((s) => {
      s.videos.forEach((v) => (dur += v.duration.value));
    });

    return dur;
  }

  get sections() {
    return this._sections;
  }

  public setImagePath(path: string): void {
    this.imagePath.setPath(path);
  }

  public toObject(): CourseObject {
    return {
      uuid: this.uuid.value,
      title: this.title.value,
      description: this.description.value,
      imagePath: this.imagePath.value ?? '',
      duration: this.duration,
      videos: this.videos,
      sections: this.sections,
    };
  }

  public toObjectWithVideosUuid(): CourseObjectOnlyUuid {
    return {
      ...this.toObject(),
      videos: this.videos.map((v) => v.uuid.value),
      sections: this._sections.map((s) => s.uuid.value),
    };
  }

  public addSections(sections: CourseSection[]): void {
    this._sections = [...this._sections, ...sections];
  }

  public addVideos(videos: Video[]): void {
    const videosToUpdate =
      videos.filter((v) => {
        if (v) return v;
      }) ?? [];

    this.videos = [...this.videos, ...videosToUpdate];
  }

  public removeVideo(uuid: string): void {
    this.videos = [...this.videos.filter((v) => v.uuid.value !== uuid)];
  }
}

export interface CourseObject {
  uuid: string;
  title: string;
  description: string;
  imagePath?: string;
  duration?: number;
  videos?: Video[];
  sections?: CourseSection[];
}

export interface CourseObjectOnlyUuid {
  uuid: string;
  title: string;
  description: string;
  imagePath?: string;
  duration?: number;
  videos?: string[];
  sections: string[];
}
