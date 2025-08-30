// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import walletRouter from './routes/v1/wallet';
import { features } from './config/features';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Health/version
app.get('/api/health', (_req, res) =>
  res.json({
    ok: true,
    env: process.env['NODE_ENV'] || 'development',
    walletDisabled: features.walletDisabled,
  })
);

app.get('/api/version', (_req, res) =>
  res.json({
    version: process.env['npm_package_version'] || 'dev',
  })
);

// API routes
app.use('/api/v1/wallet', walletRouter);

// Example: only start wallet watcher if enabled
function startWalletWatcher() {
  // NO-OP here; implement your Tron watcher later
  console.log('[watcher] Wallet watcher started (placeholder)');
}

const PORT = Number(process.env['PORT'] || 8080);

(async () => {
  try {
    if (!features.walletDisabled) {
      startWalletWatcher();
    } else {
      console.log('[watcher] Wallet disabled: watcher not started');
    }

    app.listen(PORT, () =>
      console.log(`API listening on http://localhost:${PORT}`)
    );
  } catch (e) {
    console.error('Startup failed:', e);
    process.exit(1);
  }
})();
