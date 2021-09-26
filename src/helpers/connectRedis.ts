import redis from 'redis';

export const createRedisClient = (): redis.RedisClient => {
  const client = redis.createClient({
    auth_pass: 'admin',
  });

  client.on('error', (err) => {
    console.log('Error on redis connection');
  });

  return client;
};
