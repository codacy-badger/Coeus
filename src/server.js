import http from 'http'
import chalk from 'chalk'
import socket from 'socket.io'
//import apolloServer from './core/graphql'
import app from './app'
import mongoose from './core/mongo'
import conf from './core/config'
import { log } from './utils/logger'

const port = conf.get('PORT') || 3000
const server = http.Server(app)
const debug = require('debug')('api')

debug('Server starting...')
mongoose.Promise = require('bluebird')

// apolloServer.installSubscriptionHandlers(server)
//apolloServer.applyMiddleware({
//  app,
//  path: '/graphql',
//  cors: {
//    credentials: true,
//    origin: 'http://localhost:3000'
//  }
//})

export const io = socket(server)
io.origins(['*:*'])

io.on('connection', connSocket => {
  console.log(chalk.hex('#009688')(' [*] Socket: Connection Succeeded.'))
  connSocket.on('disconnect', () =>
    console.log(chalk.hex('#009688')(' [*] Socket: Disconnected.'))
  )
})

mongoose.connection.once('open', () => {
  log.info(`Mongoose has connected`)
  server.listen(port, () =>
    log.info(`Server has started at ${port}`)
  )
})

server.on('error', err => {
  log.error('error', err, {
    isExpressError: true
  })
})

server.on('close', () => {
  log.info('Server has been closed by Admin')
})

process.on('SIGINT', () => {
  mongoose.connection.close()
  server.close()
})

export default server
