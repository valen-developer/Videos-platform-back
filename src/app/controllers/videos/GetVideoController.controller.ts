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

      const CHUCK_SIZE = 10 ** 6; // 1MB

      const startRange = Number(range?.replace(/\D/g, '') ?? 0);
      const endRange = Math.min(startRange + CHUCK_SIZE, videoSize - 1);
      const contentLength = endRange - startRange + 1;

      const headers = {
        'Content-Range': `bytes ${startRange}-${endRange}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);

      const videoStream = fs.createReadStream(videoPath, {
        start: startRange,
        end: endRange,
      });

      videoStream.pipe(res);
    } catch (error) {
      errorHandler(res, error, 'get video file controller');
    }
  }
}
