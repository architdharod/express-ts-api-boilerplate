import 'reflect-metadata';
import { container } from 'tsyringe';
import { FreshdeskFooterService } from '../services/FreshdeskFooterService';
import { FreshdeskApiService } from '../services/FreshdeskApiService';

class ContainerConfig {
    static configure() {
        container.register('FooterService', {
            useClass: FreshdeskFooterService,
        });

        container.register('FreshdeskApiService', {
            useClass: FreshdeskApiService,
        });
    }
}

export default ContainerConfig;
