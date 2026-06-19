const express = require('express');
const orderRepository = require('../repositories/orderRepository');
const inventoryRepository = require('../repositories/inventoryRepository');
const commissionRepository = require('../repositories/commissionRepository');

const router = express.Router();

router.post('/orders/:id/checkout', async (req, res, next) => {
  try {
    const order = await orderRepository.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: '订单不存在' });
      return;
    }

    await inventoryRepository.decreaseByItems(order.items || []);
    const updatedOrder = await orderRepository.updateOrderStatus(order.id, 'pending_accept', '待接单');

    res.json({
      success: true,
      data: {
        order: updatedOrder,
        status: 'success',
        tradeNo: `MOCK${Date.now()}`
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/orders/:id/complete', async (req, res, next) => {
  try {
    const order = await orderRepository.updateOrderStatus(req.params.id, 'completed', '已完成');
    if (!order) {
      res.status(404).json({ message: '订单不存在' });
      return;
    }

    const commission = await commissionRepository.createForOrder(order);
    res.json({ success: true, data: { order, commission } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
