const express = require('express');
const { products, orders, agents, buildings } = require('../mock/store');

const router = express.Router();

router.get('/admin/overview', (req, res) => {
  const salesAmount = orders.reduce((sum, order) => sum + Number(order.payAmount || 0), 0);

  res.json({
    productCount: products.length,
    orderCount: orders.length,
    agentCount: agents.length,
    buildingCount: buildings.length,
    salesAmount: Number(salesAmount.toFixed(2))
  });
});

router.get('/admin/products', (req, res) => {
  res.json(products);
});

router.post('/admin/products', (req, res) => {
  const product = {
    id: Date.now(),
    categoryId: Number(req.body.categoryId || 1),
    name: req.body.name,
    price: Number(req.body.price || 0),
    count: Number(req.body.count || 0),
    tags: req.body.tags || []
  };

  products.unshift(product);
  res.json({ success: true, data: product });
});

router.get('/admin/orders', (req, res) => {
  res.json(orders);
});

router.get('/admin/agents', (req, res) => {
  res.json(agents);
});

module.exports = router;
