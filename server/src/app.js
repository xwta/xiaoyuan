const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const categories = [
  { id: 1, name: '饮料水饮' },
  { id: 2, name: '泡面速食' },
  { id: 3, name: '薯片零食' },
  { id: 4, name: '宿舍日用' }
];

const products = [
  { id: 1, categoryId: 1, name: '可乐 500ml', price: 3.0, stock: 100, tags: ['冰饮', '热卖'] },
  { id: 2, categoryId: 1, name: '矿泉水', price: 2.0, stock: 200, tags: ['寝室必备'] },
  { id: 3, categoryId: 2, name: '桶装泡面', price: 5.5, stock: 80, tags: ['夜宵'] },
  { id: 4, categoryId: 3, name: '薯片', price: 6.9, stock: 60, tags: ['聚会'] },
  { id: 5, categoryId: 4, name: '抽纸', price: 4.9, stock: 120, tags: ['刚需'] }
];

const campuses = [
  { id: 1, name: '第一校区' }
];

const buildings = [
  { id: 1, campusId: 1, name: '6号楼' },
  { id: 2, campusId: 1, name: '8号楼' }
];

const agents = [
  {
    id: 1,
    campusId: 1,
    buildingId: 1,
    name: '6号楼校园代理点',
    pickupAddress: '6号楼一楼大厅旁',
    status: 'open'
  }
];

const orders = [
  {
    id: 1,
    orderNo: 'SN202606190001',
    status: 'pending_accept',
    statusText: '待接单',
    deliveryType: 'dormitory',
    deliveryText: '送到寝室',
    buildingName: '6号楼',
    roomNo: '602',
    contactName: '张同学',
    phone: '13800000000',
    payAmount: 18.5,
    items: [
      { productId: 1, name: '可乐 500ml', quantity: 2, totalAmount: 6 },
      { productId: 3, name: '桶装泡面', quantity: 1, totalAmount: 5.5 }
    ]
  }
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'campus-snack-server' });
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/products', (req, res) => {
  const categoryId = Number(req.query.categoryId);
  const keyword = req.query.keyword;
  let result = products;

  if (categoryId) {
    result = result.filter(item => item.categoryId === categoryId);
  }

  if (keyword) {
    result = result.filter(item => item.name.includes(keyword));
  }

  res.json(result);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(item => item.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ message: '商品不存在' });
    return;
  }
  res.json(product);
});

app.get('/api/campuses', (req, res) => {
  res.json(campuses);
});

app.get('/api/buildings', (req, res) => {
  const campusId = Number(req.query.campusId);
  res.json(buildings.filter(item => !campusId || item.campusId === campusId));
});

app.get('/api/agents', (req, res) => {
  const campusId = Number(req.query.campusId);
  const buildingId = Number(req.query.buildingId);
  const result = agents.filter(item => {
    if (campusId && item.campusId !== campusId) return false;
    if (buildingId && item.buildingId !== buildingId) return false;
    return true;
  });
  res.json(result);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    orderNo: `SN${Date.now()}`,
    status: 'pending_pay',
    statusText: '待支付',
    ...req.body
  };

  orders.unshift(order);

  res.json({
    success: true,
    data: order
  });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }
  res.json(order);
});

app.get('/api/agent/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/agent/orders/:id/accept', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'accepted';
  order.statusText = '已接单';
  res.json({ success: true, data: order });
});

app.post('/api/agent/orders/:id/delivered', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'completed';
  order.statusText = '已完成';
  res.json({ success: true, data: order });
});

app.post('/api/agent/orders/:id/verify', (req, res) => {
  const order = orders.find(item => item.id === Number(req.params.id));
  if (!order) {
    res.status(404).json({ message: '订单不存在' });
    return;
  }

  order.status = 'completed';
  order.statusText = '已核销';
  res.json({ success: true, data: order });
});

app.listen(port, () => {
  console.log(`Campus snack server listening on port ${port}`);
});
