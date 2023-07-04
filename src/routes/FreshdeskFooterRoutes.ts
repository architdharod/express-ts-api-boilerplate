import FreshdeskController from '../controllers/FreshdeskController';
import { CommonRoutesConfig } from './commonRoutesConfig';
import express from 'express';

export class FreshdeskFooterRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'FreshdeskFooter');
  }

  configureRoutes() {
    this.app.route('/agent/:id').get(FreshdeskController.getAgentFooter);

    return this.app;
  }
}
