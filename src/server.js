import http from 'http'
import socket from 'socket.io'

import apolloServer from './core/graphql'
import app from './app'
import mongoose from './core/mongo'
import conf from './core/config'
import { log } from './core/logger'

// include and initialize the rollbar library with your access token
// const Rollbar = require('rollbar')

// const rollbar = new Rollbar({
//   accessToken: 'f442d8c998864f629924b0f38fd4596a',
//   captureUncaught: true,
//   captureUnhandledRejections: true
// })

// record a generic message and send it to Rollbar
// rollbar.log('Hello world!')

const port = conf.get('PORT') || 3000

const server = http.Server(app)

mongoose.Promise = require('bluebird')

export const io = socket(server)

apolloServer.installSubscriptionHandlers(server)
apolloServer.applyMiddleware({
  app,
  path: '/graphql'
})

io.origins(['*:*'])

io.on('connection', connSocket => {
  
  log.info(`🐈 ID: ${connSocket.id} just connected.`)
  connSocket.emit('A', { coeusVersion: '1.0.1', stuff: 'ok' })
  connSocket.on('B', data => console.log(data)) // { foo: 'baz' }
  
  
  connSocket.on('Are you there?', () => {
  connSocket.emit('connection', { connection: true });
});
  

  io.to(`${connSocket.id}`).emit('me?', 'Yes you are')

  connSocket.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval)
    setInterval(() => {
      connSocket.emit('timer', new Date())
    }, interval)
  })

  connSocket.on('disconnect', () => log.info('Somebody has disconnected'))
})

mongoose.connection.once('open', () => {
  log.info(`Mongoose has connected`)
})

// I have to refactor it for Mocha-Chai Tests
export const Application = server.listen(port, () =>
  log.info(`Server has started at ${port}`)
)

server.on('error', err => {
  log.error(err)
})

server.on('close', () => {
  
})

process.on('SIGINT', () => {
  mongoose.connection.close()
  server.close()
})

process.on('uncaughtException', e => {
  console.log(e)
  server.close()
  process.exit(1)
})

process.on('unhandledRejection', e => {
  console.log(e)
  server.close()
  process.exit(1)
})

// To Mocha-Chai Tests
export const stop = () => {
  mongoose.connection.close()
  server.close()
}
