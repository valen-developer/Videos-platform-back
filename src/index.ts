import { json, urlencoded } from 'express';
import cors from 'cors';

import { initServerDependencies } from './helpers/initServeDependencies';
initServerDependencies();

import { Server } from './app/server';
import { router } from './app/routes/index.routing';

import { createRedisClient } from './helpers/connectRedis';
import { enviroment } from './app/config/enviroment';

const server = new Server(3000);
// set middlewares
server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

// Connect redis
export const redisClient = createRedisClient();

// Set routes
server.app.use(router);

server.start();

console.log(enviroment);
