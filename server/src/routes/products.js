const express = require('express');
const { categories } = require('../mock/store');
const productRepository = require('../repositories/productRepository');

const router = express.Router();

router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get('/products', async (req, res, next) => {
  try {
    const result = await productRepository.listProducts({
      categoryId: req.query.categoryId,
      keyword: req.query.keyword
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await productRepository.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: '商品不存在' });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
