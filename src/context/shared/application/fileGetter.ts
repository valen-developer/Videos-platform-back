import { existsSync, readFileSync } from 'fs';

import { HTTPException } from '../domain/HTTPException';

export const aviableExtensions = ['jpg', 'jpeg', 'png'];

export class FileGetter {
  public getImage(imagePath: string): Buffer {
    const extensionArray = aviableExtensions.filter((ext) => {
      const exit = existsSync(`${imagePath}.${ext}`);
      return exit;
    });

    if (extensionArray.length === 0)
      throw new HTTPException('get image', 'not image found', 404);

    const imagePathComplete = `${imagePath}.${extensionArray[0]}`;

    const file = readFileSync(imagePathComplete);

    return file;
  }
}
