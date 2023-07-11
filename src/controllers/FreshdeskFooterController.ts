import { Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';
import { injectable, inject } from 'tsyringe';

@injectable()
export class FreshdeskFooterController {
    private _freshdeskService: IFreshdeskFooterService;

    constructor(@inject('FooterService') freshdeskService: IFreshdeskFooterService) {
        this._freshdeskService = freshdeskService;
    }

    //  [get]/agents/:id/footers
    getAgentFooter = async (req: Request, res: Response) => {
        const idParam = parseInt(req.params.id);
        if (isNaN(idParam)) {
            throw new Error('No valid Id Provided!!');
        }
        const footer = await this._freshdeskService.getFooterByID(idParam);
        res.send(footer);
    };

    //  [get]/agents/footers (with optional query: ?email=:email)
    getFooters = async (req: Request, res: Response) => {
        const email = <string>req.query.email;

        try {
            let footers;
            if (email) {
                footers = await this._freshdeskService.getFooterByEmail(email);
            } else {
                footers = await this._freshdeskService.getAllFooters();
            }
            res.json(footers).status(200);
        } catch (error) {
            //throw or handle error here.
        }
    };

    //  [put]/agents/footers
    putAllFooters = async (req: Request, res: Response) => {
        const footer = req.body.newFooter;
        this._freshdeskService.putAllFooters(footer);
        res.send('footer changed');
    };
}
