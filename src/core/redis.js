import Redis from 'ioredis'
import conf from './config'

const redis = new Redis(conf.get('REDIS_URI'))

export default redis

