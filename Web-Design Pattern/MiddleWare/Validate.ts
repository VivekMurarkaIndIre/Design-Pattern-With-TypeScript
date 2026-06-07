import {Request, Response, NextFunction} from 'express';

export function validateBody(requiredFields: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `Missing field: ${field}` });
            }
        }
        next();
    };
}
