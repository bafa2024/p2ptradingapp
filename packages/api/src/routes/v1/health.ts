import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    version: 'v12.3',
    env: process.env['NODE_ENV'] || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;


