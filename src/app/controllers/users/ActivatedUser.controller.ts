import { Request, Response } from 'express';

import { HTTPException } from '../../../context/shared/domain/HTTPException';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { UserUpdater } from '../../../context/User/application/UserUpdater';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';
import { Controller } from '../controlles.interface';

export class ToggleActivateUserController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { userUuid } = req.body;

    try {
      if (!userUuid)
        throw new HTTPException('activate user', 'invalid user', 400);

      const container = getContainer();
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);
      const userUpdater: UserUpdater = container.get(UserUsesCases.UserUpdater);

      const user = await userFinder.getUser(userUuid);

      console.log(user.validated);
      user.toggleValidate();

      console.log(user.validated);
      await userUpdater.update(user);

      res.json({ ok: true, user: user.toObjectWithoutPassword() });
    } catch (error) {
      errorHandler(res, error, 'Toggle Activate User Controller');
    }
  }
}
