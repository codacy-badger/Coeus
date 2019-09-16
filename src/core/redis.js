import redis from 'redis'
import conf from './config'
let cache = ''


if (process.env.REDIS_URI) {
	const rtg   = require("url").parse(process.env.REDISTOGO_URL);
  cache = redis.createClient(rtg.port, rtg.hostname);

redis.auth(rtg.auth.split(":")[1]);
} else {
    cache = redis.createClient();
}

export default cache