import 'reflect-metadata';
import { FreshdeskFooterController } from '../controllers/FreshdeskFooterController';
import { CommonRoutesConfig } from './commonRoutesConfig';
import express from 'express';
import { container } from 'tsyringe';

const freshdeskFooterController = container.resolve(FreshdeskFooterController);

export class FreshdeskFooterRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'FreshdeskFooter');
    }

    configureRoutes() {
        this.app.route('/agents/:id/footers').get(freshdeskFooterController.getAgentFooter);
        this.app.route('/agents/footers').get(freshdeskFooterController.getFooters);
        this.app.route('/agents/footers').put(freshdeskFooterController.putAllFooters);
        return this.app;
    }
}
