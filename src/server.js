import 'dotenv/config';
import http from 'http';
import chalk from 'chalk';
import socket from 'socket.io';
import apolloServer from './core/graphql';
import app from './app';
import mongoose from './core/mongo';

const port = process.env.PORT || 3000;
const server = http.Server(app);
apolloServer.installSubscriptionHandlers(server);
apolloServer.applyMiddleware({ app, path: '/graphql' })
const io = socket(server);
io.origins(['*:*']);

server.listen(port, () => console.log(chalk.hex('#F7BF63')(` ✅  Server has started at ${port}.`)));

io.on('connection', (connSocket) => {
  console.log(chalk.hex('#009688')(' [*] Socket: Connection Succeeded.'));
  connSocket.on('disconnect', () => console.log(chalk.hex('#009688')(' [*] Socket: Disconnected.')));
});

mongoose.connection.once('open', () => {
  console.log(chalk.hex('#F7BF63')(` 🍐  Mongo  has started at ${port}.`));
});

export default server;