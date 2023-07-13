//TODO: set up middleware for authentication
//TODO: Setup Docker

// modules import
import 'reflect-metadata';
import express from 'express';
import * as http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import Debug from 'debug';
import ContainerConfig from './config/containerConfig';
import { container } from 'tsyringe';

//Configure Tsyringe containers
ContainerConfig.configure();

// variables import
import envVar from './config/environmentVariables';
import { CommonRoutesConfig } from './routes/commonRoutesConfig';
import { FreshdeskFooterRoutes } from './routes/FreshdeskFooterRoutes';
import { IErrorMiddleware } from './middlewares/IErrorMiddleware';
import AuthMiddleware from './middlewares/AuthMiddleware';

const errorHandler: IErrorMiddleware = container.resolve<IErrorMiddleware>('IErrorMiddleware');
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

// Test endpoint for Docker
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
app.get('/', (req, res) => {
    res.status(200).send('OK');
});

//authentication middleware
app.use(AuthMiddleware.apiKeyAuthentication);

//Routs configuration
const routes: Array<CommonRoutesConfig> = [];
routes.push(new FreshdeskFooterRoutes(app));

//Error and Invalid path handling middlewares
app.use(errorHandler.handleError);
app.use(errorHandler.handleInvalidPath);

// Server activation
server.listen(envVar.port, () => {
    routes.forEach((route: CommonRoutesConfig) => {
        debug(`Routes configured for ${route.getName()}`);
    });
    debug(`server is listning on port: ${envVar.port}`);
});
