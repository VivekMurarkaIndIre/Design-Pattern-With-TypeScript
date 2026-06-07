import {Request, Response, NextFunction} from 'express';

//use a Map<string, { count: number, resetAt: number }> keyed by authorId. Block with 429 if count exceeds 3 within 60 seconds
const rateLimitMap = new Map<string, { count: number, resetAt: number }>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
    const authorId = req.body.authorId;
    if (!authorId) {
        return res.status(400).json({ message: "Missing authorId" });
    }

    const currentTime = Date.now();
    const rateLimit = rateLimitMap.get(authorId);

    if (rateLimit) {
        if (currentTime > rateLimit.resetAt) {
            rateLimitMap.set(authorId, { count: 1, resetAt: currentTime + 60000 });
        } else {
            if (rateLimit.count >= 3) {
                return res.status(429).json({ message: "Too many requests" });
            }
            rateLimit.count += 1;
        }
    } else {
        rateLimitMap.set(authorId, { count: 1, resetAt: currentTime + 60000 });
    }

    next();
}