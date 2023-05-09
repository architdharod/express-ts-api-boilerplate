// TODO: Setup Docker
// TODO: logging

// modules import
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import Debug from 'debug';

// variables import
import envVar from './config';

// Debug configuration
const debug: Debug.IDebugger = Debug('app.ts');

// SIGINT for Killing Docker container
const process = require('process');

process.on('SIGINT', () => {
  debug('SIGINT event detected. Exiting...');
  process.exit(0);
});

// App configuration
const app = express();
const server: http.Server = http.createServer(app);
app.use(helmet);
app.use(cors());

// Test endpoint
app.get('/', (req, res) => {
  res.status(200).send('This is working');
});

// Server activation
server.listen(envVar.port, () => {
  debug(`server is listning on port: ${envVar.port}`);
});
