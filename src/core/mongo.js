import 'dotenv/config';
import mongoose from 'mongoose';
import TheModels from '../app/models';
import conf from './config'
import { log } from '../utils/logger'

const DB_URL = conf.get('IS_TEST') ? conf.get('MONGODB_TEST_URI') : conf.get('MONGODB_URI');
console.log(DB_URL)
mongoose.connect(
  conf.get('MONGODB_URI'),
  {
    keepAlive: true,
    reconnectTries: 10,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      log.error(err)
    }
  }
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

TheModels();

export default mongoose;