import { Express, Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';

let freshdeskService: IFreshdeskFooterService;

class FreshdeskFooterController {
  async getAgentFooter(req: Request, res: Response) {
    const testResponse = freshdeskService.getAgentFooter(req.params.id);
  }
}

export default new FreshdeskFooterController();
