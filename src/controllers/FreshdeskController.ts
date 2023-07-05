import { Express, Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';

export class FreshdeskFooterController {
  private freshdeskService;

  constructor(freshdeskService_: IFreshdeskFooterService) {
    this.freshdeskService = freshdeskService_;
    this.getAgentFooter = this.getAgentFooter.bind(this); //TODO: Find a better way to do this
  }

  async getAgentFooter(req: Request, res: Response) {
    const idParam = parseInt(req.params.id);

    if (isNaN(idParam)) {
      //throw error!
    }
    const testResponse = await this.freshdeskService.getAgentFooter(idParam);

    res.send(testResponse);
  }
}
