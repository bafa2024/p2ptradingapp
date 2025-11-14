// packages/api/src/routes/monitor.ts
import { Router } from 'express';
import * as MonitorController from '../controllers/monitor/monitor.controller';

const router = Router();

// Monitoring routes (public for health checks, but can be protected if needed)
router.get('/system', MonitorController.getSystemInfo);
router.get('/metrics', MonitorController.getMetrics);

export default router;

