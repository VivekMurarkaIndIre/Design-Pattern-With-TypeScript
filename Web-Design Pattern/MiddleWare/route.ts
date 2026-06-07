// routes.ts
import { Router, Request, Response } from 'express';
import { logger }       from './Logger';
import { authenticate } from './Authenticate';
import { validateBody } from './Validate';
import { rateLimiter }  from './RateLimiter';

export function createRoute(): Router {
  const router = Router();

  router.post("/",
    logger,
    authenticate,
    validateBody(["title", "content", "authorId"]),
    rateLimiter,
    (req: Request, res: Response): void => {
      const { title, content, authorId } = req.body;
      res.status(201).json({
        id:        crypto.randomUUID(),
        title,
        content,
        authorId,
        createdAt: new Date().toISOString(),
      });
    }
  );

  return router;
}