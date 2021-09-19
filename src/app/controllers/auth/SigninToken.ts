import { Request, Response } from 'express';
import { LoginToken } from '../../../context/User/application/LoginToken';
import { errorHandler } from '../../../helpers/errorHandler';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';

import { Controller } from '../controlles.interface';

export class SigninTokenController implements Controller {
  public async run(req: Request, res: Response): Promise<void> {
    const { uuid } = req.body;

    try {
      const container = getContainer();
      const loginToken: LoginToken = container.get(
        UserUsesCases.LoginUserToken
      );

      console.log(loginToken);

      const user = await loginToken.login(uuid);

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
      });
    } catch (error) {
      console.log(error);

      errorHandler(res, error, 'Signin token');
    }
  }
}
