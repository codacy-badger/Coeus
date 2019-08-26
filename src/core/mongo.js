import 'dotenv/config';
import mongoose from 'mongoose';
import chalk from 'chalk';
import TheModels from '../app/models';

const DB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/a98sd7fa89sd7fa98s7df980a';

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
    if (process.env.NODE_ENV !== 'test') {
      console.log(dbStatus)
    }
  }
);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

TheModels();

export default mongoose;