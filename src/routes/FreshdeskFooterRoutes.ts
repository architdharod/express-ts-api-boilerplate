import { FreshdeskFooterController } from '../controllers/FreshdeskController';
import { FreshdeskFooterService } from '../services/FreshdeskFooterService';
import { CommonRoutesConfig } from './commonRoutesConfig';
import express from 'express';

//injecting the services in the Controller
const freshdeskFooterService = new FreshdeskFooterService();
const freshdeskFooterController = new FreshdeskFooterController(
  freshdeskFooterService
);

export class FreshdeskFooterRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'FreshdeskFooter');
  }

  configureRoutes() {
    this.app.route('/agent/:id').get(freshdeskFooterController.getAgentFooter);

    return this.app;
  }
}
