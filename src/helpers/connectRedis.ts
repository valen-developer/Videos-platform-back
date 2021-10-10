import redis from 'redis';
import { enviroment } from '../app/config/enviroment';

export const createRedisClient = (): redis.RedisClient => {
  const client = redis.createClient({
    host: enviroment.redis.host,
    auth_pass: 'admin',
  });

  client.on('error', (err) => {
    console.log(err);
    console.log(enviroment);
    console.log('Error on redis connection');
  });

  return client;
};
