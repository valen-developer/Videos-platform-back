import { Request, Response } from 'express';
import { Controller } from '../controlles.interface';

export class GetCourseSectionController implements Controller {
  public async run(req: Request, res: Response) {
    const { sectionUuid } = req.query;
  }
}
