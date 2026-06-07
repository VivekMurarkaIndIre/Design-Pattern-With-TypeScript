// app.ts
import express, { Request, Response, NextFunction } from 'express';
import { createRoute } from './route';

const app = express();
app.use(express.json());

app.use("/posts", createRoute());

// ✅ Central error handler — exactly 4 params, always last
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[Error] ${err.message}`);
  res.status(400).json({ error: err.message });
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));