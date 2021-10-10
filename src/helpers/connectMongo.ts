import mongoose from 'mongoose';
import { enviroment } from '../app/config/enviroment';

export const connectMongoDB = () => {
  mongoose.connect(
    enviroment.db.host,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      authSource: 'admin',
      auth: {
        user: 'admin',
        password: 'admin',
      },
    },
    (err) => {
      console.log(err);
    }
  );

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.log(error);
  });

  db.once('open', () => {
    console.log('Mongo ABIERTO');
  });
};
