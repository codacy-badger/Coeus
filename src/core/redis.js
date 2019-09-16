import Redis from 'ioredis'
import conf from './config'


const config =
  process.env.NODE_ENV === 'development'
    ? {
			  host: "ec2-3-215-116-159.compute-1.amazonaws.com",
        port: 10059,
        password: "p483f309a1223bd535c3be29ee1643076f430222eccd15b3e95e2d334a9efe519",
      }
    : undefined;
		
		
		console.log(conf.get('REDIS_URI'))
const redis = new Redis(conf.get('REDIS_URI'))

export default redis