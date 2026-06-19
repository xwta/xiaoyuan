const express = require('express');
const orderRepository = require('../repositories/orderRepository');

const router = express.Router();

router.post('/orders', async (req, res, next) => {
  try {
    const order = await orderRepository.createOrder(req.body);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
});

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await orderRepository.listOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/orders/:id', async (req, res, next) => {
  try {
    const order = await orderRepository.getOrderById(req.params.id);
    if (!order) {
      res.status(404).json({ message: '订单不存在' });
      return;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
