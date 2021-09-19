import { Request, Response } from 'express';
import fs, { exists } from 'fs';
import path from 'path';
import { FileGetter } from '../../../context/shared/application/fileGetter';
import { HTTPException } from '../../../context/shared/domain/HTTPException';

import { errorHandler } from '../../../helpers/errorHandler';
import { enviroment } from '../../config/enviroment';
import { Controller } from '../controlles.interface';

export class GetCoursePosterController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { image } = req.query as any;
    const destinationPath = path.join(enviroment.courseFolderPath, '/courses');

    try {
      if (!image) throw new HTTPException('no image', 'no image found', 404);

      const existFile = fs.existsSync(path.join(destinationPath, image ?? ''));

      if (!existFile)
        throw new HTTPException('no image', 'no image found', 404);

      res.sendFile(path.join(destinationPath, image));
    } catch (error) {
      errorHandler(res, error, 'GetCoursePosterController');
    }
  }
}
