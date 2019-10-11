import mongoose from 'mongoose'
import conf from './config'
import { log } from '~/core/logger'

const MONGO_URI =
  conf.get('MONGODB_URI') || 'mongodb://localhost:27017/coeus'


mongoose.connect(
  MONGO_URI,
  {
    keepAlive: true,
    reconnectTries: 10,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
  },
  err => {
    if (err) {
      log.error(err)
    }
  }
)

export default mongoose
