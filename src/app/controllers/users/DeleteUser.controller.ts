import { Request, Response } from 'express';
import { UserEliminator } from '../../../context/User/application/UserEliminator';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';

import { Controller } from '../controlles.interface';

export class DeleteUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userUuid } = req.query;

    try {
      const container = getContainer();
      const userDeleter: UserEliminator = container.get(
        UserUsesCases.UserEliminator
      );

      await userDeleter.delete(userUuid as string);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, 'user delete controller');
    }
  }
}
