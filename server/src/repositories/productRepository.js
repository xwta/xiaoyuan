const { products } = require('../mock/store');
const { query, isDbEnabled } = require('../db');

function mapProductRow(row) {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    price: Number(row.price || 0),
    count: row.stock || row.count || 0,
    status: row.status || 'on',
    tags: []
  };
}

async function listProducts(filters = {}) {
  if (isDbEnabled()) {
    const params = [];
    const where = [];

    if (filters.categoryId) {
      where.push('category_id = ?');
      params.push(Number(filters.categoryId));
    }

    if (filters.keyword) {
      where.push('name LIKE ?');
      params.push(`%${filters.keyword}%`);
    }

    const sql = `
      SELECT id, category_id, name, price, stock, status
      FROM product
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY id DESC
    `;

    const rows = await query(sql, params);
    return rows.map(mapProductRow);
  }

  let result = products;
  if (filters.categoryId) {
    result = result.filter(item => item.categoryId === Number(filters.categoryId));
  }
  if (filters.keyword) {
    result = result.filter(item => item.name.includes(filters.keyword));
  }
  return result;
}

async function getProductById(id) {
  if (isDbEnabled()) {
    const rows = await query(
      'SELECT id, category_id, name, price, stock, status FROM product WHERE id = ? LIMIT 1',
      [Number(id)]
    );
    return rows[0] ? mapProductRow(rows[0]) : null;
  }

  return products.find(item => item.id === Number(id)) || null;
}

async function createProduct(data) {
  if (isDbEnabled()) {
    const rows = await query(
      'INSERT INTO product (category_id, name, price, stock, status) VALUES (?, ?, ?, ?, ?)',
      [Number(data.categoryId || 1), data.name, Number(data.price || 0), Number(data.count || 0), data.status || 'on']
    );
    return getProductById(rows.insertId);
  }

  const product = {
    id: Date.now(),
    categoryId: Number(data.categoryId || 1),
    name: data.name,
    price: Number(data.price || 0),
    count: Number(data.count || 0),
    status: data.status || 'on',
    tags: data.tags || []
  };
  products.unshift(product);
  return product;
}

async function updateProductById(id, data) {
  if (isDbEnabled()) {
    const current = await getProductById(id);
    if (!current) return null;

    await query(
      'UPDATE product SET category_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?',
      [
        Number(data.categoryId ?? current.categoryId),
        data.name ?? current.name,
        Number(data.price ?? current.price),
        Number(data.count ?? current.count),
        data.status || current.status || 'on',
        Number(id)
      ]
    );
    return getProductById(id);
  }

  const product = products.find(item => item.id === Number(id));
  if (!product) return null;

  product.name = data.name ?? product.name;
  product.price = data.price !== undefined ? Number(data.price) : product.price;
  product.count = data.count !== undefined ? Number(data.count) : product.count;
  product.categoryId = data.categoryId !== undefined ? Number(data.categoryId) : product.categoryId;
  product.status = data.status || product.status || 'on';
  return product;
}

async function removeProductById(id) {
  if (isDbEnabled()) {
    const current = await getProductById(id);
    if (!current) return null;
    await query('DELETE FROM product WHERE id = ?', [Number(id)]);
    return current;
  }

  const index = products.findIndex(item => item.id === Number(id));
  if (index === -1) return null;
  const [removed] = products.splice(index, 1);
  return removed;
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProductById,
  removeProductById
};
