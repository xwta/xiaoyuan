const { orders } = require('../mock/store');
const { query, isDbEnabled } = require('../db');

function mapOrderRow(row) {
  return {
    id: row.id,
    orderNo: row.order_no,
    status: row.status,
    statusText: row.status_text,
    deliveryType: row.delivery_type,
    deliveryText: row.delivery_text,
    buildingName: row.building_name,
    roomNo: row.room_no,
    contactName: row.contact_name,
    phone: row.phone,
    productAmount: Number(row.product_amount || 0),
    deliveryFee: Number(row.delivery_fee || 0),
    payAmount: Number(row.pay_amount || 0),
    pickupCode: row.pickup_code,
    items: []
  };
}

async function listOrders() {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT id, order_no, status, status_text, delivery_type, delivery_text,
       building_name, room_no, contact_name, phone, product_amount,
       delivery_fee, pay_amount, pickup_code
       FROM snack_order ORDER BY id DESC`
    );
    return rows.map(mapOrderRow);
  }

  return orders;
}

async function getOrderById(id) {
  if (isDbEnabled()) {
    const rows = await query(
      `SELECT id, order_no, status, status_text, delivery_type, delivery_text,
       building_name, room_no, contact_name, phone, product_amount,
       delivery_fee, pay_amount, pickup_code
       FROM snack_order WHERE id = ? LIMIT 1`,
      [Number(id)]
    );

    if (!rows[0]) return null;
    const order = mapOrderRow(rows[0]);
    const itemRows = await query(
      `SELECT product_id, product_name, quantity, price, total_amount
       FROM snack_order_item WHERE order_id = ?`,
      [Number(id)]
    );
    order.items = itemRows.map(item => ({
      productId: item.product_id,
      name: item.product_name,
      quantity: item.quantity,
      price: Number(item.price || 0),
      totalAmount: Number(item.total_amount || 0)
    }));
    return order;
  }

  return orders.find(item => item.id === Number(id)) || null;
}

function buildMockOrder(body) {
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

async function createOrder(body) {
  if (isDbEnabled()) {
    const orderNo = `SN${Date.now()}`;
    const deliveryText = body.deliveryType === 'pickup' ? '代理点自提' : '送到寝室';
    const pickupCode = `${Math.floor(100000 + Math.random() * 900000)}`;

    const result = await query(
      `INSERT INTO snack_order
       (order_no, status, status_text, delivery_type, delivery_text, building_name,
        room_no, contact_name, phone, product_amount, delivery_fee, pay_amount, pickup_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNo,
        'pending_accept',
        '待接单',
        body.deliveryType,
        deliveryText,
        body.buildingName || '6号楼',
        body.roomNo,
        body.contactName,
        body.phone,
        Number(body.productAmount || 0),
        Number(body.deliveryFee || 0),
        Number(body.payAmount || 0),
        pickupCode
      ]
    );

    const orderId = result.insertId;
    for (const item of body.items || []) {
      await query(
        `INSERT INTO snack_order_item
         (order_id, product_id, product_name, quantity, price, total_amount)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.name || `商品${item.productId}`,
          Number(item.quantity || 1),
          Number(item.price || 0),
          Number(item.price || 0) * Number(item.quantity || 1)
        ]
      );
    }

    return getOrderById(orderId);
  }

  const order = buildMockOrder(body);
  orders.unshift(order);
  return order;
}

async function updateOrderStatus(id, status, statusText) {
  if (isDbEnabled()) {
    await query(
      'UPDATE snack_order SET status = ?, status_text = ? WHERE id = ?',
      [status, statusText, Number(id)]
    );
    return getOrderById(id);
  }

  const order = orders.find(item => item.id === Number(id));
  if (!order) return null;
  order.status = status || order.status;
  order.statusText = statusText || order.statusText;
  return order;
}

module.exports = {
  listOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
};
