import 'reflect-metadata';
import { FreshdeskFooterController } from '../controllers/FreshdeskController';
import { CommonRoutesConfig } from './commonRoutesConfig';
import express from 'express';
import { container } from 'tsyringe';

const freshdeskFooterController = container.resolve(FreshdeskFooterController);

export class FreshdeskFooterRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'FreshdeskFooter');
  }

  configureRoutes() {
    this.app.route('/agent/:id').get(freshdeskFooterController.getAgentFooter);

    return this.app;
  }
}
