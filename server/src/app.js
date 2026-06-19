const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/products');
const campusRoutes = require('./routes/campus');
const orderRoutes = require('./routes/orders');
const agentRoutes = require('./routes/agent');
const adminRoutes = require('./routes/admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'campus-snack-server' });
});

app.use('/api', productRoutes);
app.use('/api', campusRoutes);
app.use('/api', orderRoutes);
app.use('/api', agentRoutes);
app.use('/api', adminRoutes);

app.use((req, res) => {
  res.status(404).json({ message: '接口不存在' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '服务异常' });
});

app.listen(port, () => {
  console.log(`Campus snack server listening on port ${port}`);
});
