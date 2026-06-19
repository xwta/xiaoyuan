const express = require('express');
const { categories, products } = require('../mock/store');

const router = express.Router();

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get('/products', (req, res) => {
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

router.get('/products/:id', (req, res) => {
  const product = products.find(item => item.id === Number(req.params.id));
  if (!product) {
    res.status(404).json({ message: '商品不存在' });
    return;
  }

  res.json(product);
});

module.exports = router;
