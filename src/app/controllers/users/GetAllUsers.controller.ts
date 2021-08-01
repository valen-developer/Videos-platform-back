import { Request, Response } from 'express';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';
import { Controller } from '../controlles.interface';

const service = 'Get All users controller';

export class GetAllUsersController implements Controller {
  public async run(req: Request, res: Response) {
    try {
      const container = getContainer();
      const userFinder: UserFinder = container.get(UserUsesCases.UserFinder);

      const users = await userFinder.getAll();

      res.json({
        ok: true,
        users: users.map((u) => u.toObjectWithoutPassword()),
      });
    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}
