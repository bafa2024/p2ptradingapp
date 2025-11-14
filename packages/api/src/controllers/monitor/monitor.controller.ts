// packages/api/src/controllers/monitor/monitor.controller.ts
import { Request, Response } from 'express';
import os from 'os';
import { User } from '../../models/User';
import { Order } from '../../models/Order';
import Transaction from '../../models/Transaction';
import { Wallet } from '../../models/Wallet';
import { Op } from 'sequelize';
import { activeConnections } from '../../socket';

export async function getSystemInfo(req: Request, res: Response) {
  try {
    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    // Get active socket connections count
    let activeSocketCount = 0;
    for (const connections of activeConnections.values()) {
      activeSocketCount += connections.length;
    }

    return res.json({
      success: true,
      system: {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        uptime: {
          seconds: Math.floor(uptime),
          formatted: formatUptime(uptime)
        },
        memory: {
          total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem(),
          process: {
            rss: memoryUsage.rss,
            heapTotal: memoryUsage.heapTotal,
            heapUsed: memoryUsage.heapUsed,
            external: memoryUsage.external
          }
        },
        cpu: {
          count: os.cpus().length,
          model: os.cpus()[0]?.model || 'Unknown',
          usage: {
            user: cpuUsage.user,
            system: cpuUsage.system
          }
        },
        sockets: {
          active: activeSocketCount,
          rooms: activeConnections.size
        }
      }
    });
  } catch (error) {
    console.error('[getSystemInfo] error:', error);
    return res.status(500).json({
      success: false,
      error: 'system_info_failed',
      message: 'Failed to fetch system information'
    });
  }
}

export async function getMetrics(req: Request, res: Response) {
  try {
    // Get user metrics
    const totalUsers = await User.count();
    const activeUsers = await User.count({
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      }
    });

    // Get order metrics
    const totalOrders = await Order.count();
    const openOrders = await Order.count({ where: { status: 'open' } });
    const completedOrders = await Order.count({ where: { status: 'completed' } });

    // Get transaction metrics
    const totalTransactions = await Transaction.count();
    const recentTransactions = await Transaction.count({
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });

    // Calculate total transaction volume
    const transactions = await Transaction.findAll({
      attributes: ['amount', 'price']
    });
    const totalVolume = transactions.reduce((sum, txn) => {
      return sum + (Number(txn.amount) * Number(txn.price));
    }, 0);

    // Get wallet balance metrics
    const wallets = await Wallet.findAll({
      attributes: ['usdt_available', 'usdt_locked']
    });
    const totalBalance = wallets.reduce((sum, wallet) => {
      return sum + Number(wallet.usdt_available) + Number(wallet.usdt_locked);
    }, 0);
    const totalLocked = wallets.reduce((sum, wallet) => {
      return sum + Number(wallet.usdt_locked);
    }, 0);
    const totalAvailable = wallets.reduce((sum, wallet) => {
      return sum + Number(wallet.usdt_available);
    }, 0);

    return res.json({
      success: true,
      metrics: {
        users: {
          total: totalUsers,
          active: activeUsers
        },
        orders: {
          total: totalOrders,
          open: openOrders,
          completed: completedOrders
        },
        transactions: {
          total: totalTransactions,
          last24h: recentTransactions,
          totalVolume: totalVolume.toFixed(8)
        },
        wallets: {
          total: wallets.length,
          totalBalance: totalBalance.toFixed(8),
          totalAvailable: totalAvailable.toFixed(8),
          totalLocked: totalLocked.toFixed(8)
        }
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[getMetrics] error:', error);
    return res.status(500).json({
      success: false,
      error: 'metrics_fetch_failed',
      message: 'Failed to fetch metrics'
    });
  }
}

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

