import { Request, Response } from 'express';
import { HTTPException } from '../../../context/shared/domain/HTTPException';
import { ICrypt } from '../../../context/shared/domain/interfaces/Crypt.interface';
import { JWT } from '../../../context/shared/infrastructure/jwt.JWT';
import { LoginUser } from '../../../context/User/application/LoginUser';
import { UserFinder } from '../../../context/User/application/UserFinder';
import { errorHandler } from '../../../helpers/errorHandler';
import { updateCourseFolder } from '../../../scripts/folderVideoAnylizer';
import { enviroment } from '../../config/enviroment';
import { getContainer } from '../../dic/getContainer';
import { UserUsesCases } from '../../dic/userUseCases.injector';
import { UtilDependencies } from '../../dic/utils.injector';
import { Controller } from '../controlles.interface';

const service = 'signin controller';

export class SigninController implements Controller {
  public async run(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const container = getContainer();
      const loginUser: LoginUser = container.get(UserUsesCases.LoginUser);

      const user = await loginUser.login(email, password);
      const isUserValidated = user.validated;

      if (!isUserValidated) {
        throw new HTTPException(
          'Signin: user invalidated',
          'user dont validated',
          401
        );
      }

      const jwt: JWT = container.get(UtilDependencies.JWT);
      const token = jwt.sign({ uuid: user.uuid.value }, enviroment.token.seed, {
        expiresIn: enviroment.token.expireIn,
      });

      res.json({
        ok: true,
        user: user.toObjectWithoutPassword(),
        token,
      });
    } catch (error) {
      errorHandler(res, error, service);
    }
  }
}
