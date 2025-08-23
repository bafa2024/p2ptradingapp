import express from 'express';
import cors from 'cors';
import { devConfig } from './config/development';

const app = express();

// Basic middleware
app.use(cors({
  origin: devConfig.security.corsOrigin,
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: devConfig.app.environment,
    version: devConfig.app.version,
  });
});

// API info endpoint
app.get('/api', (_req, res) => {
  res.json({
    message: 'P2P Platform API (Test Mode)',
    version: devConfig.app.version,
    environment: devConfig.app.environment,
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

// Basic route
app.get('/api/v1/test', (_req, res) => {
  res.json({
    success: true,
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(devConfig.debug.enabled && { error: err.message }),
  });
});

// Start server
const startServer = () => {
  const port = devConfig.app.port;
  
  app.listen(port, () => {
    console.log(`🚀 Test server running on port ${port}`);
    console.log(`📱 Environment: ${devConfig.app.environment}`);
    console.log(`🔗 Health check: http://localhost:${port}/health`);
    console.log(`📚 API info: http://localhost:${port}/api`);
    console.log(`🧪 Test endpoint: http://localhost:${port}/api/v1/test`);
  });
};

if (require.main === module) {
  startServer();
}

export default app;


