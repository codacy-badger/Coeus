import { version } from '../../package.json'

const conf = require('nconf')

conf
  .argv()
  .env()
  .file({
    file: './config.json'
  })

conf.set('VERSION', version)
conf.set('IS_PROD', process.env.NODE_ENV === 'production')
conf.set('IS_DEV', process.env.NODE_ENV === 'development')
conf.set('IS_TEST', process.env.NODE_ENV === 'test')

export default conf
