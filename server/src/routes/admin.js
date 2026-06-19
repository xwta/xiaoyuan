const express = require('express');
const { orders, agents, buildings } = require('../mock/store');
const productRepository = require('../repositories/productRepository');

const router = express.Router();

router.get('/admin/overview', async (req, res, next) => {
  try {
    const productList = await productRepository.listProducts();
    const salesAmount = orders.reduce((sum, order) => sum + Number(order.payAmount || 0), 0);

    res.json({
      productCount: productList.length,
      orderCount: orders.length,
      agentCount: agents.length,
      buildingCount: buildings.length,
      salesAmount: Number(salesAmount.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
});

router.get('/admin/products', async (req, res, next) => {
  try {
    const result = await productRepository.listProducts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/admin/products', async (req, res, next) => {
  try {
    const product = await productRepository.createProduct(req.body);
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.put('/admin/products/:id', async (req, res, next) => {
  try {
    const product = await productRepository.updateProductById(req.params.id, req.body);
    if (!product) {
      res.status(404).json({ message: '商品不存在' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

router.delete('/admin/products/:id', async (req, res, next) => {
  try {
    const product = await productRepository.removeProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: '商品不存在' });
      return;
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
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
