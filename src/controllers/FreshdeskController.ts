import { Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';
import { injectable, inject } from 'tsyringe';

@injectable()
export class FreshdeskFooterController {
  private _freshdeskService: IFreshdeskFooterService;

  constructor(
    @inject('FooterService') freshdeskService: IFreshdeskFooterService
  ) {
    this._freshdeskService = freshdeskService;
  }

  getAgentFooter = async (req: Request, res: Response) => {
    const idParam = parseInt(req.params.id);

    if (isNaN(idParam)) {
      //throw error!
    }

    const testResponse = await this._freshdeskService.getAgentFooter(idParam);

    res.send(testResponse);
  };
}
