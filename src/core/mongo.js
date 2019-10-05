import mongoose from 'mongoose';
import models from '~/app/models';
import conf from './config'
import { log } from '~/core/logger'

const MONGO_URI = conf.get('MONGODB_URI') || 'mongodb://localhost:27017/coeusTest'

mongoose.connect(
  MONGO_URI,
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