import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import { VideoFinder } from '../../../context/Video/application/VideoFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { getContainer } from '../../dic/getContainer';
import { VideosUsesCases } from '../../dic/videoUsesCases';
import { Controller } from '../controlles.interface';
import { HTTPException } from '../../../context/shared/domain/HTTPException';

export class GetVideoController implements Controller {
  public async run(req: Request, res: Response) {
    const { videoUuid } = req.query;
    const { range } = req.headers;

    try {
      if (!videoUuid) {
        throw new HTTPException(
          'get video streamer',
          'video uuid  shouldn´t be null',
          400
        );
      }

      const container = getContainer();
      const videoFinder: VideoFinder = container.get(
        VideosUsesCases.VideoFinder
      );

      const video = await videoFinder.getByUuid(videoUuid as string);
      const videoPath = path.normalize(path.join(video.path.value));

      const videoSize = fs.statSync(videoPath).size;

      if (range) {
        const rangeStringParts = range.replace(/bytes=/, '').split('-');

        const bytesStart = parseInt(rangeStringParts[0]);
        const bytesEnd = rangeStringParts[1]
          ? parseInt(rangeStringParts[1])
          : videoSize - 1;

        const CHUCK_SIZE = bytesEnd - bytesStart + 1; // 1MB

        const videoStream = fs.createReadStream(videoPath, {
          start: bytesStart,
          end: bytesEnd,
        });
        const headers = {
          'Content-Range': `bytes ${bytesStart}-${bytesEnd}/${videoSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': CHUCK_SIZE,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, headers);

        videoStream.pipe(res);
      }

      const headers = {
        'Content-Length': videoSize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
    } catch (error) {
      errorHandler(res, error, 'get video file controller');
    }
  }
}
