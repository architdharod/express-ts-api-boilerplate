import 'reflect-metadata';
import { container } from 'tsyringe';
import { FreshdeskFooterService } from '../services/FreshdeskFooterService';
import { FreshdeskApiService } from '../services/FreshdeskApiService';
import { ErrorHandlerMiddleware } from '../middlewares/ErrorHandlerMiddleware';

class ContainerConfig {
    static configure() {
        container.register('FooterService', {
            useClass: FreshdeskFooterService,
        });

        container.register('FreshdeskApiService', {
            useClass: FreshdeskApiService,
        });

        container.register('IErrorMiddleware', {
            useClass: ErrorHandlerMiddleware,
        });
    }
}

export default ContainerConfig;
