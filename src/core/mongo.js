import 'dotenv/config';
import mongoose from 'mongoose';
import TheModels from '../app/models';
import conf from './config'
import { log } from '../utils/logger'

const DB_URL = conf.get('MONGODB_URI') || 'mongodb://localhost:27017/a98sd7fa89sd7fa98s7df980a';

mongoose.connect(
  DB_URL,
  {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      log.error(err)
    }
  }
);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

TheModels();

export default mongoose;