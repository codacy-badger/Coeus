import Redis from 'ioredis'
import conf from './config'

const REDIS_URI = conf.get('REDIS_URI') || 'redis://127.0.0.1:6379'
const redis = new Redis({
  port: 6379, // Redis port
  host: "redis", // Redis host
});

export default redis

