import { IFreshdeskFooterService } from './IFreshdeskFooterService';

export class FreshdeskFooterService implements IFreshdeskFooterService {
  async getAgentFooter(id: number): Promise<string> {
    //validate that input is a string!
    return (
      'your id was: ' + id + ' (Implementation of IFreshdeskFooterService)'
    );
  }
}
