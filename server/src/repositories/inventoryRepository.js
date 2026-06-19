const { products } = require('../mock/store');
const { query, isDbEnabled } = require('../db');

async function decrease(productId, quantity) {
  const number = Number(quantity || 0);
  if (!number) return null;

  if (isDbEnabled()) {
    await query(
      'UPDATE product SET stock = GREATEST(stock - ?, 0) WHERE id = ?',
      [number, Number(productId)]
    );
    return true;
  }

  const product = products.find(item => item.id === Number(productId));
  if (!product) return null;
  product.count = Math.max(Number(product.count || 0) - number, 0);
  return product;
}

async function decreaseByItems(items = []) {
  for (const item of items) {
    await decrease(item.productId, item.quantity);
  }
  return true;
}

module.exports = {
  decrease,
  decreaseByItems
};
