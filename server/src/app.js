const express = require('express');
const cors = require('cors');

const config = require('./config/appConfig');
const productRoutes = require('./routes/products');
const campusRoutes = require('./routes/campus');
const orderRoutes = require('./routes/orders');
const agentRoutes = require('./routes/agent');
const userRoutes = require('./routes/users');
const checkoutRoutes = require('./routes/checkout');
const sessionRoutes = require('./routes/adminAuth');
const adminOverviewRoutes = require('./routes/adminOverview');
const adminRoutes = require('./routes/admin');
const areaReadRoutes = require('./routes/areaRead');
const agentGoodsReadRoutes = require('./routes/agentGoodsRead');
const recordReadRoutes = require('./routes/recordRead');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'campus-snack-server' });
});

app.use('/api', productRoutes);
app.use('/api', campusRoutes);
app.use('/api', orderRoutes);
app.use('/api', agentRoutes);
app.use('/api', userRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', sessionRoutes);
app.use('/api', adminOverviewRoutes);
app.use('/api', adminRoutes);
app.use('/api', areaReadRoutes);
app.use('/api', agentGoodsReadRoutes);
app.use('/api', recordReadRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'server error' });
});

app.listen(config.port, () => {
  console.log(`Campus snack server listening on port ${config.port}`);
});
