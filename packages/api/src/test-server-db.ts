import express from 'express';
import cors from 'cors';
import sequelize from './database/connection';
import { devConfig } from './config/development';

const app = express();

// Basic middleware
app.use(cors({
  origin: devConfig.security.corsOrigin,
  credentials: true,
}));

app.use(express.json());

// Health check endpoint with database status
app.get('/health', async (_req, res) => {
  try {
    // Test database connection
    await sequelize.authenticate();
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: devConfig.app.environment,
      version: devConfig.app.version,
      database: {
        status: 'connected',
        name: sequelize.getDatabaseName(),
        dialect: sequelize.getDialect(),
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      environment: devConfig.app.environment,
      version: devConfig.app.version,
      database: {
        status: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
  }
});

// API info endpoint
app.get('/api', (_req, res) => {
  res.json({
    message: 'P2P Platform API (Database Test Mode)',
    version: devConfig.app.version,
    environment: devConfig.app.environment,
    endpoints: {
      health: '/health',
      api: '/api',
      'database-info': '/api/v1/db-info',
      'test-users': '/api/v1/users',
    },
  });
});

// Database info endpoint
app.get('/api/v1/db-info', async (_req, res) => {
  try {
    // Get table information
    const [tables] = await sequelize.query('SHOW TABLES');
    const tableNames = Array.isArray(tables) ? tables.map((table: any) => Object.values(table)[0]) : [];

    // Get counts for each table
    const tableCounts: Record<string, number> = {};
    
    for (const tableName of tableNames) {
      try {
        const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM \`${tableName}\``);
        if (Array.isArray(countResult) && countResult.length > 0) {
          tableCounts[tableName as string] = (countResult[0] as any).count;
        }
      } catch (error) {
        tableCounts[tableName as string] = -1; // Error counting
      }
    }

    res.json({
      success: true,
      database: {
        name: sequelize.getDatabaseName(),
        dialect: sequelize.getDialect(),
        tables: tableNames,
        tableCounts,
        totalTables: tableNames.length,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get database information',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

// Test users endpoint (read-only)
app.get('/api/v1/users', async (_req, res) => {
  try {
    // Simple query to get users (without exposing sensitive data)
    const [users] = await sequelize.query(`
      SELECT 
        id,
        phone_number,
        email,
        username,
        kyc_status,
        membership_tier,
        created_at,
        updated_at
      FROM users 
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        users: users,
        count: Array.isArray(users) ? users.length : 0,
      },
      message: 'Users retrieved successfully (limited to 10)',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve users',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

// Test endpoint for creating a user (for testing purposes)
app.post('/api/v1/test-user', async (req, res) => {
  try {
    const { phone_number, email, username } = req.body;

    if (!phone_number) {
      return res.status(400).json({
        success: false,
        message: 'phone_number is required',
      });
    }

    // Generate a unique ID (UUID format)
    const userId = require('crypto').randomUUID();

    const [result] = await sequelize.query(`
      INSERT INTO users (
        id, 
        phone_number, 
        email, 
        username, 
        kyc_status, 
        membership_tier,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, 'pending', 'free', NOW(), NOW())
    `, {
      replacements: [userId, phone_number, email || null, username || null],
    });

    res.status(201).json({
      success: true,
      data: {
        id: userId,
        phone_number,
        email,
        username,
        kyc_status: 'pending',
        membership_tier: 'free',
      },
      message: 'Test user created successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create test user',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
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
const startServer = async () => {
  const port = devConfig.app.port;
  
  try {
    // Test database connection on startup
    console.log('🔍 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    app.listen(port, () => {
      console.log(`🚀 API server with database running on port ${port}`);
      console.log(`📱 Environment: ${devConfig.app.environment}`);
      console.log(`🔗 Health check: http://localhost:${port}/health`);
      console.log(`📚 API info: http://localhost:${port}/api`);
      console.log(`🗄️  Database info: http://localhost:${port}/api/v1/db-info`);
      console.log(`👥 Users endpoint: http://localhost:${port}/api/v1/users`);
      console.log(`🧪 Create test user: POST http://localhost:${port}/api/v1/test-user`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

export default app;


