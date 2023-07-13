import express from 'express';
import argon2 from 'argon2';
import { API_KEYS_HASH } from '../config/apiHash';

import Debug from 'debug';
const debug: Debug.IDebugger = Debug('AuthMiddleware');

class AuthMiddleware {
    async apiKeyAuthentication(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.header('x-api-key')) {
            const requestApiKey = <string>req.header('x-api-key');
            for (const key_hash of API_KEYS_HASH) {
                if (await argon2.verify(key_hash, requestApiKey)) {
                    debug('x-api-key Authentication successful!');
                    return next();
                }
            }
        }
        debug('Invalid or missing x-api-key');
        res.status(400).send({ error: 'Invalid or missing x-api-key' });
    }
}

export default new AuthMiddleware();
