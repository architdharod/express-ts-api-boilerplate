import { Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';
import { injectable, inject } from 'tsyringe';

@injectable()
export class FreshdeskFooterController {
    private _freshdeskService: IFreshdeskFooterService;

    constructor(@inject('FooterService') freshdeskService: IFreshdeskFooterService) {
        this._freshdeskService = freshdeskService;
    }

    getAgentFooter = async (req: Request, res: Response) => {
        const idParam = parseInt(req.params.id);
        if (isNaN(idParam)) {
            //throw error!
        }
        const testResponse = await this._freshdeskService.getFooterByID(idParam);
        res.send(testResponse);
    };

    getAllFooters = async (req: Request, res: Response) => {
        const responseFooters = await this._freshdeskService.getAllFooters();
        res.send(responseFooters);
    };

    putAllFooters = async (req: Request, res: Response) => {
        //call the relavent service here
        res.send('footer changed');
    };
}
