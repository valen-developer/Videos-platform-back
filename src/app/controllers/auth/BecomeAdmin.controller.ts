import { Request, Response } from 'express';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';
import { Controller } from '../controlles.interface';

const service = 'Become admin user controller';

export class BecomeAdminController implements Controller {
  public async run(req: Request, res: Response) {
    // Is already check that user is admin to become another in admin

    const { userUuid } = req.body;

    try {
      const container = getContainer();
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);

      const user = await userFinder.getUser(userUuid);
      user.turnAdminRole();

      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);
      await userUpdater.update(user);

      res.json({
        ok: true,
      });
    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}
