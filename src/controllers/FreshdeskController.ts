import { Express, Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';

export class FreshdeskFooterController {
  private freshdeskService;

  constructor(freshdeskService_: IFreshdeskFooterService) {
    this.freshdeskService = freshdeskService_;
  }

  async getAgentFooter(req: Request, res: Response) {
    const testResponse = await this.freshdeskService.getAgentFooter(
      req.params.id
    );
  }
}
