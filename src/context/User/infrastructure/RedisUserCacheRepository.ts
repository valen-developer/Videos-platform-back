import { redisClient } from '../../..';

import { UserCacheRepository } from '../domain/interfaces/UserCacheRepository.interface';
import { UserObject, User } from '../domain/user.model';

export class RedisUserCacheRepository implements UserCacheRepository {
  public getUserByEmail(uuid: string): Promise<UserObject | null> {
    return new Promise((resolve, reject) => {
      redisClient.get(uuid, (err, data) => {
        if (err || !data) resolve(null);

        if (data) resolve(JSON.parse(data));
      });
    });
  }

  public async setUser(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
      redisClient.set(
        user.uuid.value,
        JSON.stringify(user.toObject()),
        (err, ok) => {
          console.log(err);

          if (err || ok !== 'OK') resolve(false);

          if (ok === 'OK') resolve(true);
        }
      );
    });
  }
}
