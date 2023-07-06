import 'reflect-metadata';
import { container } from 'tsyringe';
import { FreshdeskFooterService } from '../services/FreshdeskFooterService';

class ContainerConfig {
  static configure() {
    container.register('FooterService', {
      useClass: FreshdeskFooterService,
    });
  }
}

export default ContainerConfig;
