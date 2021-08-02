import { enviroment } from '../../../app/config/enviroment';
import { IVideoDuration } from '../../Video/domain/interfaces/Videoduration.interface';

import path from 'path';
import fs from 'fs';
import { Video } from '../../Video/domain/video.model';
import { IUuidGenerator } from '../../shared/domain/interfaces/UUIDGenerator.interface';
import { Course } from '../domain/Course.model';
import { CourseSection } from '../../CourseSection/domain/CourseSection.model';

export class CourseFolderUpdater {
  private courseFolder = enviroment.courseFolderPath;
  private allowedExtensions = ['mp4'];

  constructor(
    private videoDuration: IVideoDuration,
    private uuidGenerator: IUuidGenerator
  ) {}

  public async update(): Promise<Course[]> {
    const coursesFolders = this.getCoursesFolderNameFromCourseFolder();

    // Accedo a cada uno de los cursos
    const courses: Course[] = [];
    const coursesDirty = await Promise.all(
      coursesFolders.map(async (courseFolder) => {
        // Accedo a cada una de las secciones del curso
        const courseFolderContent = this.getSectionsFolderNames(courseFolder);
        const courseSectionFolders = courseFolderContent.filter((item) => {
          const stats = fs.statSync(
            path.join(this.courseFolder, courseFolder, item)
          );
          return stats.isDirectory();
        });

        const videosWithoutSection = courseFolderContent.filter(
          (itemContent) => {
            const stats = fs.statSync(
              path.join(this.courseFolder, courseFolder, itemContent)
            );
            const isDirectory = stats.isDirectory();
            const isAllowedExtension = this.allowedExtensions.includes(
              this.getExtension(itemContent)
            );

            const isValidVideo = !isDirectory && isAllowedExtension;

            return isValidVideo;
          }
        );

        const sections: CourseSection[] = [];
        const sectionsDirty = await Promise.all(
          courseSectionFolders.map(async (sectionFolder) => {
            const videosFileNames = this.getVideosFromSection(
              sectionFolder,
              courseFolder
            );

            let videos = await Promise.all(
              videosFileNames.map(async (fileName) => {
                const isAllowedExtension = this.allowedExtensions.includes(
                  this.getExtension(fileName)
                );
                if (!isAllowedExtension) return;

                const videoPath = path.join(
                  this.courseFolder,
                  courseFolder,
                  sectionFolder,
                  fileName
                );
                const duration = await this.videoDuration.get(videoPath);
                const videoName = fileName;

                return new Video({
                  uuid: this.uuidGenerator.generate(),
                  duration,
                  path: path.join(courseFolder, sectionFolder, fileName),
                  title: videoName,
                });
              })
            );

            const depuratedVideos: Video[] = [];

            videos.forEach((v) => {
              if (v instanceof Video) depuratedVideos.push(v);
            });

            return new CourseSection({
              uuid: this.uuidGenerator.generate(),
              title: sectionFolder,
              videos: depuratedVideos,
            });
          })
        );

        sectionsDirty.forEach((s) => {
          if (s instanceof CourseSection) sections.push(s);
        });

        const videos: Video[] = [];
        const videosDirty = await Promise.all(
          videosWithoutSection.map(async (videoName) => {
            const isAllowedExtension = this.allowedExtensions.includes(
              this.getExtension(videoName)
            );
            if (!isAllowedExtension) return;

            const videoPath = path.join(
              this.courseFolder,
              courseFolder,
              videoName
            );
            const duration = await this.videoDuration.get(videoPath);

            return new Video({
              uuid: this.uuidGenerator.generate(),
              duration,
              path: path.join(courseFolder, videoName),
              title: videoName,
            });
          })
        );

        videosDirty.forEach((v) => {
          if (v instanceof Video) videos.push(v);
        });

        return new Course({
          uuid: this.uuidGenerator.generate(),
          description: '',
          title: courseFolder,
          sections,
          videos,
        });
      })
    );
    coursesDirty.forEach((c) => {
      if (c instanceof Course) courses.push(c);
    });

    return courses;
  }

  private getCoursesFolderNameFromCourseFolder(): string[] {
    return fs.readdirSync(this.courseFolder, { encoding: 'utf-8' });
  }

  private getSectionsFolderNames(courseFolderName: string): string[] {
    const folderPath = path.join(this.courseFolder, courseFolderName);
    const stats = fs.statSync(folderPath);

    if (!stats.isDirectory()) return [];

    return fs.readdirSync(folderPath, { encoding: 'utf-8' });
  }

  private getVideosFromSection(
    sectionFolder: string,
    courseFolder: string
  ): string[] {
    const folderPath = path.join(
      this.courseFolder,
      courseFolder,
      sectionFolder
    );
    const stats = fs.statSync(folderPath);

    if (!stats.isDirectory()) return [];

    return fs.readdirSync(folderPath, { encoding: 'utf-8' });
  }

  private async createVideos(
    videos: string[],
    courseName: string
  ): Promise<Video[]> {
    const video = await Promise.all(
      videos.map(async (fileName) => {
        const filePath = path.join(this.courseFolder, courseName, fileName);
        const isAllowedExtension = this.allowedExtensions.includes(
          this.getExtension(fileName)
        );

        const stats = fs.statSync(filePath);

        if (!isAllowedExtension && stats.isDirectory()) return;

        const duration = await this.videoDuration.get(filePath);
        const title = fileName;
        const videoPath = path.join(courseName, title);

        return new Video({
          duration,
          path: videoPath,
          title,
          uuid: this.uuidGenerator.generate(),
        });
      })
    );

    return video as Video[];
  }

  private getExtension(fileName: string): string {
    const fileNameParts = fileName.split('.');
    const extension = fileNameParts[fileNameParts.length - 1];

    return extension;
  }
}
