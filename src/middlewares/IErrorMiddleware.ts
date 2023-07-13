import { Request, Response, NextFunction } from 'express';
import { HtmlError } from '../utils/HtmlError';

export interface IErrorMiddleware {
    handleError(err: HtmlError, req: Request, res: Response, next: NextFunction): void;
    handleInvalidPath(req: Request, res: Response): void;
}
