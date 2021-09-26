import { enviroment } from '../../../app/config/enviroment';
import { ICrypt } from '../../../context/shared/domain/interfaces/Crypt.interface';
import { UserCacheRepository } from '../../../context/User/domain/interfaces/UserCacheRepository.interface';
import { UserRepository } from '../../../context/User/domain/interfaces/UserRepository.interface';
import { User } from '../../../context/User/domain/user.model';
import { HTTPException } from '../../shared/domain/HTTPException';
import { IJWT } from '../../shared/domain/interfaces/JWT.interface';
import { UserFinder } from './UserFinder';

export class LoginUser {
  constructor(
    private userCacheRepository: UserCacheRepository,
    private userFinder: UserFinder,
    private crypt: ICrypt
  ) {}

  public async login(email: string, password: string): Promise<User> {
    const user = await this.userFinder.getByEmail(email);

    this.saveOnCache(user);

    const isValid = this.crypt.compare(password, user.password.value ?? 'pass');
    if (!isValid)
      throw new HTTPException('LoginUser', 'email or password invalid', 401);

    return user;
  }

  private async saveOnCache(user: User): Promise<void> {
    this.userCacheRepository.setUser(user);
  }
}

/**
 * Primero comprobamos si el usuario está en la bbdd redis. Si no está, procedemos con DB.
 * Cuando traemos el usuario, lo guardamos en redis por un tiempo de 30 minutos
 * Si esta, recuperamos los datos de redis
 */
