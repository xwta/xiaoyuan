const express = require('express');
const orderCore = require('../services/orderCore');
const { send } = require('../utils/result');

const router = express.Router();

router.get('/v2/order-list', async (req, res, next) => {
  try {
    const data = await orderCore.listOrders(req.query);
    send(res, data);
  } catch (error) {
    next(error);
  }
});

router.get('/v2/order-detail/:id', async (req, res, next) => {
  try {
    const data = await orderCore.getOrder(req.params.id);
    if (!data) {
      res.status(404).json({ success: false, message: 'not found' });
      return;
    }
    send(res, data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
