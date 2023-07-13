import { HtmlError } from '../utils/HtmlError';
import { IErrorMiddleware } from './IErrorMiddleware';
import { Request, Response, NextFunction } from 'express';

export class ErrorHandlerMiddleware implements IErrorMiddleware {
    handleError(err: HtmlError, req: Request, res: Response, next: NextFunction) {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';

        res.status(statusCode).json({ error: message });
    }

    handleInvalidPath(req: Request, res: Response) {
        const statusCode = 404;
        const message = `Unknown request: ${req.method} ${req.path}`;

        res.status(statusCode).json({ error: message });
    }
}
