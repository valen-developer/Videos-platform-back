import path from 'path';

export const enviroment = {
  db: {
    db: process.env.DB || 'videosplatform',
    host: process.env.DATABASE_HOST || 'host',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'admin',
  },
  mailer: {
    mail: process.env.NEWSPAPER_MAIL || 'email@email.com',
    adminMail: process.env.ADMIN_MAIL || 'email@email.com',
    password: process.env.MAIL_PASSWORD || 'pass',
    host: process.env.MAIL_HOST || 'gmail',
    port: process.env.MAIL_PORT || 553,
  },
  token: {
    seed: process.env.TOKENSEED || 'Una seed',
    expireIn: process.env.TOKENEXPIRE || '30d',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
  },
  apiUrl: process.env.API_URL || 'http://localhost:3000/api',
  courseFolderPath: process.env.COURSES_FOLDER_PATH || '/courses',
};
