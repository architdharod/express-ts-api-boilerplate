// TODO: Setup Docker
// TODO: logging

// modules import
import 'reflect-metadata';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import Debug from 'debug';
import ContainerConfig from './config/containerConfig';

//Configure Tsyringe containers
ContainerConfig.configure();

// variables import
import envVar from './config';
import { CommonRoutesConfig } from './routes/commonRoutesConfig';
import { FreshdeskFooterRoutes } from './routes/FreshdeskFooterRoutes';

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
app.use(helmet());
app.use(cors());

//Routs configuration
const routes: Array<CommonRoutesConfig> = [];
routes.push(new FreshdeskFooterRoutes(app));

// Test endpoint
app.get('/', (req, res) => {
  res.status(200).send('This is working');
});

// Server activation
server.listen(envVar.port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debug(`Routes configured for ${route.getName()}`);
  });
  debug(`server is listning on port: ${envVar.port}`);
});
