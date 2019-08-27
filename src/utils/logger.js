import winston, { createLogger, format, transports } from 'winston'
import conf from '../core/config'




require('winston-mongodb')
require('express-async-errors')

const MONGO_URL =
  conf.get('MONGODB_URI') ||
  'mongodb://localhost:27017/a98sd7fa89sd7fa98s7df980a'

  const config = {
    levels: {
      error: 0,
      debug: 1,
      warn: 2,
      data: 3,
      info: 4,
      verbose: 5,
      silly: 6,
      access: 0
    },
    colors: {
      error: 'red',
      debug: 'blue',
      warn: 'yellow',
      data: 'grey',
      info: 'bold green',
      verbose: 'cyan',
      silly: 'magenta',
      access: 'yellow'
    }
  };

winston.addColors(config.colors);

export const log = createLogger({
  levels: config.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.colorize({ all: true }),
    format.simple()
  ),
//  defaultMeta: { service: 'Coeus API' },
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new transports.File({
      filename: 'access.log',
      level: 'access',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new transports.File({ filename: 'logfile.log' }),
//    new transports.MongoDB({ db: MONGO_URL })
  ]
})

if (conf.get('IS_DEV')) {
  log.add(
    new transports.Console({
      level: 'info',
      handleExceptions: true,
      json: true,
      format: format.combine(
        winston.format.splat(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(info => {
          const { timestamp, level, message, ...args } = info
          const ts = timestamp.slice(0, 19).replace('T', ' ')
          return `${ts}  [${level}]: ${message}
          ${Object.keys(args).length ? JSON.stringify(args, null, 2) : '' }`
        })
      )
    })
  )
}

export const handleException = async exc => {
  await log.error(exc.message || 'No msg field')
  // TODO: send me an email
  // Something bad happened, kill the process and then restart fresh
  // TODO: use other winston transports
  process.exit(1)
}

process.on('uncaughtException', handleException)
process.on('unhandledRejection', handleException)

process.on('exit', code => {
  console.log(`Exiting with code: ${code}`)
})

// const p = Promise.reject(new Error('Ive been rejected :('));
// p.then(() => { console.log('done'); });
