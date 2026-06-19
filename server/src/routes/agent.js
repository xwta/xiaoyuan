const express = require('express');
const { orders, agentGoods, commissionRecords } = require('../mock/store');

const router = express.Router();

router.get('/agent/summary', (req, res) => {
  const todaySales = orders.reduce((sum, order) => sum + Number(order.payAmount || 0), 0);
  const todayCommission = commissionRecords.reduce((sum, record) => sum + Number(record.amount || 0), 0);

  res.json({
    todayOrders: orders.length,
    todaySales: Number(todaySales.toFixed(2)),
    todayCommission: Number(todayCommission.toFixed(2)),
    pendingOrders: orders.filter(order => order.status === 'pending_accept').length,
    deliveringOrders: orders.filter(order => order.status === 'delivering').length,
    pickupOrders: orders.filter(order => order.status === 'waiting_pickup').length
  });
});

router.get('/agent/orders', (req, res) => {
  res.json(orders);
});

router.get('/agent/stocks', (req, res) => {
  res.json(agentGoods.map(item => ({
    ...item,
    stock: item.count,
    warningStock: item.warningCount
  })));
});

router.get('/agent/commissions', (req, res) => {
  const pending = commissionRecords.reduce((sum, record) => sum + Number(record.amount || 0), 0);
  res.json({
    summary: {
      pending: Number(pending.toFixed(2)),
      settled: 312.8
    },
    records: commissionRecords
  });
});

router.post('/agent/orders/:id/accept', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'accepted';
  order.statusText = '已接单';
  res.json({ success: true, data: order });
});

router.post('/agent/orders/:id/delivered', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'completed';
  order.statusText = '已完成';
  res.json({ success: true, data: order });
});

router.post('/agent/orders/:id/verify', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'completed';
  order.statusText = '已完成';
  res.json({ success: true, data: order });
});

module.exports = router;
