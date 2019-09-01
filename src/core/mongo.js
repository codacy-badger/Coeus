import 'dotenv/config';
import mongoose from 'mongoose';
import TheModels from '../app/models';
import conf from './config'
import { log } from '../utils/logger'

const DB_URL = conf.get('IS_TEST') ? conf.get('MONGODB_TEST_URI') : conf.get('MONGODB_URI');
mongoose.connect(
  DB_URL,
  {
    keepAlive: true,
    reconnectTries: 10,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:true,
    useCreateIndex:true
  },
  err => {
    if (err) {
      log.error(err)
    }
  }
);

TheModels();

export default mongoose;