import http from 'http'
import chalk from 'chalk'
import socket from 'socket.io'
//import apolloServer from './core/graphql'
import app from './app'
import mongoose from './core/mongo'
import conf from './core/config'


const port = conf.get('PORT') || 3000
const server = http.Server(app)
const debug = require('debug')('api')

debug('Server starting...')
mongoose.Promise = global.Promise

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
  console.log(chalk.hex('#F7BF63')(` 🍐  Mongo  has connected.`))
  server.listen(port, () =>
    console.log(chalk.hex('#F7BF63')(` ✅  Server has started at ${port}.`))
  )
})

process.on('unhandledRejection', error => {
  process.exit(1)
})

process.on('exit', code => {
  console.log(`Exiting with code: ${code}`)
})

export default server
