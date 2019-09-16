import Redis from 'ioredis'


const RedisConfig ={
  port: 23339, // Redis port
  host: "ec2-3-220-50-71.compute-1.amazonaws.com", // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "p1d3a9fee8e6af2fae8b18990ecffd65e2f8ddab903d4047d11a634422b15f799",
	user: 'h',
  db: 0
}

const redis = new Redis(RedisConfig)

export default redis