import { IFreshdeskFooterService } from './IFreshdeskFooterService';

export class FreshdeskFooterService implements IFreshdeskFooterService {
  async getAgentFooter(id: string): Promise<string> {
    //validate that input is a string!
    return 'your id was: ' + id;
  }
}
