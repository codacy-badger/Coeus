import mongoose from 'mongoose';
import models from '~/app/models';
import conf from './config'
import { log } from '~/core/logger'

const DB_URL = conf.get('IS_TEST') ? conf.get('MONGODB_TEST_URI') : conf.get('MONGODB_URI');
mongoose.connect(
  DB_URL,
  {
    keepAlive: true,
    reconnectTries: 10,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    useCreateIndex:true
  },
  err => {
    if (err) {
      log.error(err)
    }
  }
);

// mongoose.Error.messages = require('@ladjs/mongoose-error-messages')

models();

export default mongoose;