import express from 'express';
/**
 * Base class for routers. Routes are configured along with middlewares and
 * use of respective controllers for two reasons:
 * 1. Single responsibality: Routes only do routing. Controllers will only return
 *    the responses.
 * 2. Testing will be easier: the HTTP request handelling can be tested easily,
 *    while providing the controller with TestService class.
 */
export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  getName() {
    return this.name;
  }

  abstract configureRoutes(): express.Application;
}
