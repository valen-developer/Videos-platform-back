import fs from 'fs';
import path from 'path';

import { getVideoDurationInSeconds } from 'get-video-duration';
import { v4 } from 'uuid';

import { enviroment } from '../app/config/enviroment';
import { getContainer } from '../app/dic/getContainer';
import { VideosUsesCases } from '../app/dic/videoUsesCases';
import { VideoCreator } from '../context/Video/application/VideoCreator';
import { Course } from '../context/Course/domain/Course.model';
import { Video } from '../context/Video/domain/video.model';
import { CourseCreator } from '../context/Course/application/CourseCreator';
import { CourseUsesCases } from '../app/dic/courseUsesCases';

const allowedExtensions = ['mp4'];

export const createCourseFromFolder = async (
  folderPath: string,
  folderName: string
) => {
  try {
    const files = fs.readdirSync(folderPath);

    const course = new Course({
      uuid: v4(),
      description: '',
      title: folderName,
    });

    let videos = await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(folderPath, fileName);
        const stats = fs.statSync(filePath);
        const isValidExtension = allowedExtensions.includes(
          getExtension(fileName)
        );

        if (!(stats.isDirectory() || !isValidExtension)) {
          const duration = await getVideoDurationInSeconds(filePath);
          const uuid = v4();

          const video = new Video({
            uuid,
            duration,
            title: fileName,
            path: path.join(folderName, fileName),
          });

          return video;
        }
      }) ?? []
    );

    course.addVideos(videos.filter((v) => v) as Video[]);

    const container = getContainer();
    const courseCreator: CourseCreator = container.get(
      CourseUsesCases.CourseCreator
    );
    const videoCreator: VideoCreator = container.get(
      VideosUsesCases.VideoCreator
    );

    await courseCreator.create(course);
    course.videos.forEach(async (v) => {
      await videoCreator.create(v);
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCourseFolder = () => {
  const coursefolder = enviroment.courseFolderPath;
  const folders = fs.readdirSync(coursefolder);

  folders.forEach((f) => {
    const subfolderPath = path.join(coursefolder, f);
    fs.stat(subfolderPath, (err, stats) => {
      if (err) return;
      if (!stats.isDirectory()) return;

      createCourseFromFolder(subfolderPath, f);
    });
  });
};

const getExtension = (fileName: string): string => {
  const fileNameParts = fileName.split('.');
  const extension = fileNameParts[fileNameParts.length - 1];

  return extension;
};
