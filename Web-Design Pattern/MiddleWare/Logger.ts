import {Request, Response, NextFunction} from 'express';


export function logger(req: Request, res: Response, next: NextFunction) {
    //[TIMESTAMP] METHOD /url
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    console.log(`[${timestamp}] ${method} ${url}`);
    next();
}