const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'campus-snack-server' });
});

app.get('/api/categories', (req, res) => {
  res.json([
    { id: 1, name: '饮料' },
    { id: 2, name: '泡面速食' },
    { id: 3, name: '薯片零食' }
  ]);
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, categoryId: 1, name: '可乐 500ml', price: 3.0, stock: 100 },
    { id: 2, categoryId: 2, name: '桶装泡面', price: 5.5, stock: 80 }
  ]);
});

app.post('/api/orders', (req, res) => {
  const order = {
    id: Date.now(),
    orderNo: `SN${Date.now()}`,
    status: 'pending_pay',
    ...req.body
  };

  res.json({
    success: true,
    data: order
  });
});

app.get('/api/agent/orders', (req, res) => {
  res.json([
    {
      id: 1,
      orderNo: 'SN202606190001',
      deliveryType: 'dormitory',
      buildingName: '6号楼',
      roomNo: '602',
      payAmount: 18.5,
      status: 'paid'
    }
  ]);
});

app.listen(port, () => {
  console.log(`Campus snack server listening on port ${port}`);
});
