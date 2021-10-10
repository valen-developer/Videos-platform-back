import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface';

export class VerifyUserValidatedMiddleware implements Middleware {
  public async run(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
