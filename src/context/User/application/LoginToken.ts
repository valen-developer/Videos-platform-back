import { HTTPException } from '../../shared/domain/HTTPException';
import { UserCacheRepository } from '../domain/interfaces/UserCacheRepository.interface';
import { User } from '../domain/user.model';

export class LoginToken {
  constructor(private userCacheRepository: UserCacheRepository) {}

  public async login(uuid: string): Promise<User> {
    const user = await this.getFromCache(uuid);

    console.log('user: ', user);

    if (!user)
      throw new HTTPException('user from cache', 'not valid user', 401);

    return user;
  }

  private async getFromCache(uuid: string): Promise<User | null> {
    const userObject = await this.userCacheRepository.getUserByEmail(uuid);

    if (!userObject) return null;

    return new User(
      userObject.uuid,
      userObject.name,
      userObject.email,
      userObject.password,
      userObject.role,
      userObject.validated
    );
  }
}
