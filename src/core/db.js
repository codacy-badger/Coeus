import 'dotenv/config';
import mongoose from 'mongoose';
import chalk from 'chalk';
import TheModels from '../app/models';

const DB_URL = process.env.MONGODB_URI;

const StartMongo = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      DB_URL,
      {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useNewUrlParser: true
      },
      err => {
        let dbStatus = ''
        if (err) {
          dbStatus = chalk.hex('#C1184F')('❌  Mongoose cannot connect.');
        }
        dbStatus = chalk.hex('#5EC5BE')(' ✅  Mongoose has connected.');
        if (process.env.NODE_ENV !== 'test') {
          console.log(dbStatus)
        }
      }
    );
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useFindAndModify', false);
  }
	
	export const InitMongo = () => {
		StartMongo();
		TheModels();
}	
  mongoose.connection.on('error', error => console.error(error));
  mongoose.connection.on('disconnected', InitMongo);
