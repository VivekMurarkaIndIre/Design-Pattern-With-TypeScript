import {Request, Response, NextFunction} from 'express';

export function authenticate(req: Request, res: Response, next: NextFunction) {

    //  reads x-api-key header, rejects with 401 if missing or not equal to "secret123"
    const apiKey = req.header("x-api-key");
    if (!apiKey || apiKey !== "secret123") {
        return res.status(401).json({message: "Unauthorized"});
    }
    next();
}
