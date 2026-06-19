const express = require('express');
const { orders } = require('../mock/store');

const router = express.Router();

function buildOrderFromRequest(body) {
  const items = (body.items || []).map(item => ({
    productId: item.productId,
    name: item.name || `商品${item.productId}`,
    quantity: Number(item.quantity || 1),
    price: Number(item.price || 0),
    totalAmount: Number(item.price || 0) * Number(item.quantity || 1)
  }));

  return {
    id: Date.now(),
    orderNo: `SN${Date.now()}`,
    status: 'pending_accept',
    statusText: '待接单',
    deliveryType: body.deliveryType,
    deliveryText: body.deliveryType === 'pickup' ? '代理点自提' : '送到寝室',
    campusId: body.campusId,
    buildingId: body.buildingId,
    buildingName: body.buildingName || '6号楼',
    roomNo: body.roomNo,
    contactName: body.contactName,
    phone: body.phone,
    agentId: body.agentId,
    productAmount: Number(body.productAmount || 0),
    deliveryFee: Number(body.deliveryFee || 0),
    payAmount: Number(body.payAmount || 0),
    pickupCode: `${Math.floor(100000 + Math.random() * 900000)}`,
    items
  };
}

router.post('/orders', (req, res) => {
  const order = buildOrderFromRequest(req.body);
  orders.unshift(order);

  res.json({ success: true, data: order });
});

router.get('/orders', (req, res) => {
  res.json(orders);
});

router.get('/orders/:id', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  res.json(order);
});

module.exports = router;
