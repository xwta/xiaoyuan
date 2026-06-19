const express = require('express');
const productRepository = require('../repositories/productRepository');
const orderRepository = require('../repositories/orderRepository');
const campusRepository = require('../repositories/campusRepository');

const router = express.Router();

router.get('/admin/overview', async (req, res, next) => {
  try {
    const productList = await productRepository.listProducts();
    const orderList = await orderRepository.listOrders();
    const agentList = await campusRepository.listAgents();
    const buildingList = await campusRepository.listBuildings();
    const salesAmount = orderList.reduce((sum, order) => sum + Number(order.payAmount || 0), 0);

    res.json({
      productCount: productList.length,
      orderCount: orderList.length,
      agentCount: agentList.length,
      buildingCount: buildingList.length,
      salesAmount: Number(salesAmount.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
