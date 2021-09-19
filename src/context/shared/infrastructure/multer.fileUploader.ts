import fs from 'fs';
import path from 'path';
import { File as FileForm } from 'formidable';

import { Request, Response } from 'express';

import { FileUploader } from '../domain/interfaces/FileUploader';
import { HTTPException } from '../domain/HTTPException';
import { aviableExtensions } from '../application/fileGetter';

export class FormFileUploader implements FileUploader {
  constructor() {}

  /**
   *
   * @param request File from formidable
   * @param response
   * @param fileName
   * @param destinationPath
   */
  public async upload(
    file: FileForm,
    fileName: string,
    destinationPath: string
  ): Promise<string> {
    if (!file)
      throw new HTTPException('FormFileUploader', 'not file found', 400);

    const fileExtension = this.extractExtension(file.name ?? '');

    if (!aviableExtensions.includes(fileExtension))
      throw new HTTPException('FormFileUploader', 'invalid file', 400);

    const newPath = path.join(destinationPath, `${fileName}.${fileExtension}`);

    aviableExtensions.forEach((ext) => {
      const namePath = path.join(destinationPath, `${fileName}.${ext}`);
      const exits = fs.existsSync(namePath);

      if (exits) {
        fs.unlink(namePath, (err) => {
          console.log(err);
        });
      }
    });

    fs.rename(file.path, newPath, (err) => {
      console.log(err);
    });

    return `${fileName}.${fileExtension}`;
  }

  private extractExtension(fileName: string): string {
    const parts = fileName.split('.');
    const ext = parts[parts.length - 1];

    return ext;
  }
}
