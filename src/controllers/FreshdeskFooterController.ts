import { NextFunction, Request, Response } from 'express';
import { IFreshdeskFooterService } from '../services/IFreshdeskFooterService';
import { injectable, inject } from 'tsyringe';
import { HtmlError } from '../utils/HtmlError';

@injectable()
export class FreshdeskFooterController {
    private _freshdeskService: IFreshdeskFooterService;

    constructor(@inject('FooterService') freshdeskService: IFreshdeskFooterService) {
        this._freshdeskService = freshdeskService;
    }

    //  [get]/agents/:id/footers
    getAgentFooter = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const idParam = parseInt(req.params.id);
            if (isNaN(idParam)) {
                throw new HtmlError('Agent ID has to be a number. Correct usage: /agents/[number]/footers', 400);
            }
            const footer = await this._freshdeskService.getFooterByID(idParam);
            res.send(footer);
        } catch (error) {
            next(error);
        }
    };

    //  [get]/agents/footers (with optional query: ?email=:email)
    getFooters = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email = <string>req.query.email;
            let footers;
            if (email) {
                footers = await this._freshdeskService.getFooterByEmail(email);
            } else {
                footers = await this._freshdeskService.getAllFooters();
            }
            res.json(footers).status(200);
        } catch (error) {
            next(error);
        }
    };

    //  [put]/agents/footers
    putAllFooters = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const footer = req.body;

            if (typeof footer !== 'string' || footer.trim() === '') {
                throw new HtmlError('The request body must not be empty and must be a string! (Content-Type: text/plain)', 400);
            }
            this._freshdeskService.putAllFooters(<string>footer);
            res.send('Footers are being updated: \n' + footer);
        } catch (error) {
            next(error);
        }
    };
}
