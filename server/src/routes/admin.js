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
    status: req.body.status || 'on',
    tags: req.body.tags || []
  };

  products.unshift(product);
  res.json({ success: true, data: product });
});

router.put('/admin/products/:id', (req, res) => {
  const product = products.find(item => item.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ message: '商品不存在' });
    return;
  }

  product.name = req.body.name ?? product.name;
  product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
  product.count = req.body.count !== undefined ? Number(req.body.count) : product.count;
  product.categoryId = req.body.categoryId !== undefined ? Number(req.body.categoryId) : product.categoryId;
  product.status = req.body.status || product.status || 'on';

  res.json({ success: true, data: product });
});

router.delete('/admin/products/:id', (req, res) => {
  const index = products.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: '商品不存在' });
    return;
  }

  const [removed] = products.splice(index, 1);
  res.json({ success: true, data: removed });
});

router.get('/admin/orders', (req, res) => {
  res.json(orders);
});

router.put('/admin/orders/:id/status', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = req.body.status || order.status;
  order.statusText = req.body.statusText || order.statusText;

  res.json({ success: true, data: order });
});

router.get('/admin/agents', (req, res) => {
  res.json(agents);
});

router.post('/admin/agents', (req, res) => {
  const agent = {
    id: Date.now(),
    campusId: Number(req.body.campusId || 1),
    buildingId: Number(req.body.buildingId || 1),
    name: req.body.name,
    pickupAddress: req.body.pickupAddress,
    status: req.body.status || 'open'
  };

  agents.unshift(agent);
  res.json({ success: true, data: agent });
});

router.put('/admin/agents/:id/status', (req, res) => {
  const agent = agents.find(item => item.id === Number(req.params.id));
  if (!agent) {
    res.status(404).json({ message: '代理点不存在' });
    return;
  }

  agent.status = req.body.status || agent.status;
  res.json({ success: true, data: agent });
});

module.exports = router;
