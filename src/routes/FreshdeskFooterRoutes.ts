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

  //The parent class calls this method in constructure
  configureRoutes() {
    this.app
      .route('/agents/:id/footer')
      .get(freshdeskFooterController.getAgentFooter);
    this.app
      .route('/agents/footer')
      .get(freshdeskFooterController.getAllFooters);
    return this.app;
  }
}
