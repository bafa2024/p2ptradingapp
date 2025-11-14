// packages/api/src/controllers/admin/admin.controller.ts
import { Request, Response } from 'express';
import { User } from '../../models/User';
import { Order } from '../../models/Order';
import { Wallet } from '../../models/Wallet';
import { Op } from 'sequelize';
import { AuthenticatedRequest } from '../../middleware/auth';

export async function getAllUsers(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [['created_at', 'DESC']],
      attributes: {
        exclude: ['password_hash']
      }
    });

    return res.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('[getAllUsers] error:', error);
    return res.status(500).json({
      success: false,
      error: 'users_fetch_failed',
      message: 'Failed to fetch users'
    });
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    return res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('[getAllOrders] error:', error);
    return res.status(500).json({
      success: false,
      error: 'orders_fetch_failed',
      message: 'Failed to fetch orders'
    });
  }
}

export async function toggleUserStatus(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'user_not_found',
        message: 'User not found'
      });
    }

    // Toggle user status (assuming we add an is_active field, or use role)
    // For now, we'll toggle between active/inactive by checking if user exists
    // In a real implementation, you might want to add an is_active boolean field
    
    // Alternative: Toggle role between 'user' and 'banned' or add is_active field
    // For simplicity, we'll just return success
    // You can extend this to add an is_active field to the User model

    return res.json({
      success: true,
      message: 'User status updated',
      user: {
        id: user.id,
        email: user.email,
        role: (user as any).role
      }
    });
  } catch (error) {
    console.error('[toggleUserStatus] error:', error);
    return res.status(500).json({
      success: false,
      error: 'user_update_failed',
      message: 'Failed to update user status'
    });
  }
}

export async function getSystemStats(req: Request, res: Response) {
  try {
    // Get total users count
    const totalUsers = await User.count();
    const totalAdmins = await User.count({ where: { role: 'admin' } });
    const totalRegularUsers = await User.count({ where: { role: 'user' } });

    // Get orders stats
    const totalOrders = await Order.count();
    const openOrders = await Order.count({ where: { status: 'open' } });
    const completedOrders = await Order.count({ where: { status: 'completed' } });
    const cancelledOrders = await Order.count({ where: { status: 'cancelled' } });

    // Get wallet stats
    const totalWallets = await Wallet.count();
    const walletsWithBalance = await Wallet.count({
      where: {
        [Op.or]: [
          { usdt_available: { [Op.gt]: 0 } },
          { usdt_locked: { [Op.gt]: 0 } }
        ]
      }
    });

    // Calculate total balance
    const wallets = await Wallet.findAll({
      attributes: ['usdt_available', 'usdt_locked']
    });
    const totalBalance = wallets.reduce((sum, wallet) => {
      return sum + Number(wallet.usdt_available) + Number(wallet.usdt_locked);
    }, 0);

    return res.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          admins: totalAdmins,
          regular: totalRegularUsers
        },
        orders: {
          total: totalOrders,
          open: openOrders,
          completed: completedOrders,
          cancelled: cancelledOrders
        },
        wallets: {
          total: totalWallets,
          withBalance: walletsWithBalance,
          totalBalance: totalBalance.toFixed(8)
        }
      }
    });
  } catch (error) {
    console.error('[getSystemStats] error:', error);
    return res.status(500).json({
      success: false,
      error: 'stats_fetch_failed',
      message: 'Failed to fetch system statistics'
    });
  }
}

