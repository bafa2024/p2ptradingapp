// src/controllers/order/order.controller.ts
import { Response } from 'express';
import { Order } from '../../models/Order';
import { Wallet } from '../../models/Wallet';
import { AuthenticatedRequest } from '../../middleware/auth';
import { Op, Transaction as SequelizeTx } from 'sequelize';
import { sequelize } from '../../database/connection';
import Transaction from '../../models/Transaction';

async function matchOrders(newOrder: Order): Promise<void> {
  // Runs matching in a DB transaction to keep balances consistent
  await sequelize.transaction(async (t: SequelizeTx) => {
    const isBuy = newOrder.type === 'buy';
    const priceOperator = isBuy ? Op.lte : Op.gte;
    const counterType = isBuy ? 'sell' : 'buy';

    // Find candidate counter orders FIFO by created_at
    const counterOrders = await Order.findAll({
      where: {
        type: counterType as any,
        status: 'open',
        price: { [priceOperator]: newOrder.price as any }
      },
      order: [['created_at', 'ASC']],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (counterOrders.length === 0) {
      return; // nothing to match
    }

    // Reload the fresh newOrder inside tx to ensure latest state
    await newOrder.reload({ transaction: t, lock: t.LOCK.UPDATE });

    for (const counter of counterOrders) {
      if (newOrder.status !== 'open') break;
      if (counter.status !== 'open') continue;

      const tradeAmount = Number(Math.min(Number(newOrder.amount), Number(counter.amount)));
      if (tradeAmount <= 0) continue;

      // Trade price: maker price (counter order price)
      const tradePrice = Number(counter.price);
      const tradeValue = Number((tradeAmount * tradePrice).toFixed(8));

      // Determine buyer and seller ids based on order types
      const buyerId = isBuy ? newOrder.user_id : counter.user_id;
      const sellerId = isBuy ? counter.user_id : newOrder.user_id;

      // Load wallets and lock rows
      const buyerWallet = await Wallet.findOne({ where: { user_id: buyerId }, transaction: t, lock: t.LOCK.UPDATE });
      const sellerWallet = await Wallet.findOne({ where: { user_id: sellerId }, transaction: t, lock: t.LOCK.UPDATE });
      if (!buyerWallet || !sellerWallet) {
        // If either wallet missing, skip this counter order gracefully
        continue;
      }

      // Validate locked funds based on who initiated
      // - Buy orders lock quote (USDT) equal to amount*price when created
      // - Sell orders lock base amount when created
      if (isBuy) {
        // Buyer is newOrder: ensure buyer has sufficient locked funds for trade value
        if (Number(buyerWallet.usdt_locked) < tradeValue) {
          // Not enough locked funds; stop matching further to avoid negative
          break;
        }
      } else {
        // Seller is newOrder: ensure seller has sufficient locked amount
        if (Number(sellerWallet.usdt_locked) < tradeAmount) {
          break;
        }
      }

      // Apply wallet transfers
      // Reduce buyer locked, increase seller available by tradeValue
      buyerWallet.usdt_locked = Number(buyerWallet.usdt_locked) - tradeValue;
      sellerWallet.usdt_available = Number(sellerWallet.usdt_available) + tradeValue;

      // For sell orders, also reduce seller locked amount by tradeAmount
      // For buy orders matched against existing sells, the seller (counter) had locked amount when their order was created
      const makerIsSeller = counter.type === 'sell';
      if (makerIsSeller) {
        // counter is seller: reduce their locked amount
        sellerWallet.usdt_locked = Math.max(0, Number(sellerWallet.usdt_locked) - tradeAmount);
      } else {
        // counter is buyer: reduce their locked value accordingly
        buyerWallet.usdt_locked = Math.max(0, Number(buyerWallet.usdt_locked) - tradeValue);
      }

      // Persist wallet updates
      await buyerWallet.save({ transaction: t });
      await sellerWallet.save({ transaction: t });

      // Record trade in Transactions table
      await Transaction.create({
        buyer_id: buyerId,
        seller_id: sellerId,
        amount: tradeAmount,
        price: tradePrice
      } as any, { transaction: t });

      // Update order amounts and status
      newOrder.amount = Number((Number(newOrder.amount) - tradeAmount).toFixed(8));
      counter.amount = Number((Number(counter.amount) - tradeAmount).toFixed(8));

      if (Number(counter.amount) <= 0) {
        counter.status = 'completed';
      }
      if (Number(newOrder.amount) <= 0) {
        newOrder.status = 'completed';
      }

      await counter.save({ transaction: t });
      await newOrder.save({ transaction: t });
    }
  });
}

export async function createBuyOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const { amount, price } = req.body;
    const userId = req.userId;

    // Validate required parameters
    if (!amount || !price) {
      return res.status(400).json({
        success: false,
        error: 'missing_parameters',
        message: 'Amount and price are required'
      });
    }

    if (amount <= 0 || price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'invalid_parameters',
        message: 'Amount and price must be positive numbers'
      });
    }

    // Calculate total cost
    const cost = Number(amount) * Number(price);

    // Get user's wallet
    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Check if sufficient funds
    if (Number(wallet.usdt_available) < cost) {
      return res.status(400).json({
        success: false,
        error: 'insufficient_funds',
        message: 'Insufficient funds for buy order'
      });
    }

    // Lock funds (move from available to locked)
    wallet.usdt_available = Number(wallet.usdt_available) - cost;
    wallet.usdt_locked = Number(wallet.usdt_locked) + cost;
    await wallet.save();

    // Create buy order
    const order = await Order.create({
      user_id: userId,
      type: 'buy',
      amount: Number(amount),
      price: Number(price),
      status: 'open'
    } as any);

    // Try to match immediately
    await matchOrders(order);

    return res.status(201).json({
      success: true,
      order: {
        id: order.id,
        type: order.type,
        amount: order.amount,
        price: order.price,
        total_value: order.total_value,
        status: order.status,
        created_at: order.created_at
      }
    });
  } catch (error) {
    console.error('[createBuyOrder] error:', error);
    return res.status(500).json({
      success: false,
      error: 'order_creation_failed',
      message: 'Failed to create buy order'
    });
  }
}

export async function createSellOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const { amount, price } = req.body;
    const userId = req.userId;

    // Validate required parameters
    if (!amount || !price) {
      return res.status(400).json({
        success: false,
        error: 'missing_parameters',
        message: 'Amount and price are required'
      });
    }

    if (amount <= 0 || price <= 0) {
      return res.status(400).json({
        success: false,
        error: 'invalid_parameters',
        message: 'Amount and price must be positive numbers'
      });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // For sell orders, we check if user has enough assets (simplified: use total balance)
    // In a real system, this would check specific asset balances
    if (Number(wallet.total_usdt) < Number(amount)) {
      return res.status(400).json({
        success: false,
        error: 'insufficient_funds',
        message: 'Insufficient assets for sell order'
      });
    }

    // Lock the amount for sell order
    wallet.usdt_available = Number(wallet.usdt_available) - Number(amount);
    wallet.usdt_locked = Number(wallet.usdt_locked) + Number(amount);
    await wallet.save();

    // Create sell order
    const order = await Order.create({
      user_id: userId,
      type: 'sell',
      amount: Number(amount),
      price: Number(price),
      status: 'open'
    } as any);

    // Try to match immediately
    await matchOrders(order);

    return res.status(201).json({
      success: true,
      order: {
        id: order.id,
        type: order.type,
        amount: order.amount,
        price: order.price,
        total_value: order.total_value,
        status: order.status,
        created_at: order.created_at
      }
    });
  } catch (error) {
    console.error('[createSellOrder] error:', error);
    return res.status(500).json({
      success: false,
      error: 'order_creation_failed',
      message: 'Failed to create sell order'
    });
  }
}

export async function getOpenOrders(req: AuthenticatedRequest, res: Response) {
  try {
    const { type } = req.query;
    const userId = req.userId;

    // Build where clause
    const whereClause: any = { 
      status: 'open',
      user_id: userId // Only return user's own orders
    };

    // Add type filter if provided
    if (type && (type === 'buy' || type === 'sell')) {
      whereClause.type = type;
    }

    // Get open orders
    const orders = await Order.findAll({
      where: whereClause,
      order: [['created_at', 'DESC']]
    });

    return res.json({
      success: true,
      orders: orders.map(order => ({
        id: order.id,
        type: order.type,
        amount: order.amount,
        price: order.price,
        total_value: order.total_value,
        status: order.status,
        created_at: order.created_at
      }))
    });
  } catch (error) {
    console.error('[getOpenOrders] error:', error);
    return res.status(500).json({
      success: false,
      error: 'orders_fetch_failed',
      message: 'Failed to fetch open orders'
    });
  }
}

export async function cancelOrder(req: AuthenticatedRequest, res: Response) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    // Validate order ID
    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'missing_parameters',
        message: 'Order ID is required'
      });
    }

    // Find order by ID and user ID
    const order = await Order.findOne({ 
      where: { 
        id: id, 
        user_id: userId 
      } 
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'order_not_found',
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (order.status !== 'open') {
      return res.status(400).json({
        success: false,
        error: 'cannot_cancel',
        message: 'Order cannot be cancelled'
      });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(400).json({
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Use database transaction to ensure consistency
    await sequelize.transaction(async (t: SequelizeTx) => {
      // Reload order and wallet with lock to prevent race conditions
      await order.reload({ transaction: t, lock: t.LOCK.UPDATE });
      await wallet.reload({ transaction: t, lock: t.LOCK.UPDATE });

      // Double-check order is still open
      if (order.status !== 'open') {
        throw new Error('Order is no longer open');
      }

      // Refund locked funds based on order type
      if (order.type === 'buy') {
        // Buy order: refund locked funds (amount * price)
        const refundAmount = Number(order.amount) * Number(order.price);
        wallet.usdt_locked = Number(wallet.usdt_locked) - refundAmount;
        wallet.usdt_available = Number(wallet.usdt_available) + refundAmount;
      } else if (order.type === 'sell') {
        // Sell order: refund locked amount
        const refundAmount = Number(order.amount);
        wallet.usdt_locked = Number(wallet.usdt_locked) - refundAmount;
        wallet.usdt_available = Number(wallet.usdt_available) + refundAmount;
      }

      // Update order status to cancelled
      order.status = 'cancelled';

      // Save both order and wallet
      await order.save({ transaction: t });
      await wallet.save({ transaction: t });
    });

    return res.json({
      success: true,
      order: {
        id: order.id,
        type: order.type,
        amount: order.amount,
        price: order.price,
        total_value: order.total_value,
        status: order.status,
        created_at: order.created_at
      },
      wallet: {
        balance: wallet.usdt_available,
        locked: wallet.usdt_locked,
        total: wallet.total_usdt
      }
    });
  } catch (error) {
    console.error('[cancelOrder] error:', error);
    return res.status(500).json({
      success: false,
      error: 'order_cancellation_failed',
      message: 'Failed to cancel order'
    });
  }
}

