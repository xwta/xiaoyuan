const { query, isDbEnabled } = require('../db');

const mockRecords = [];

async function createForOrder(order) {
  if (!order) return null;
  const amount = order.deliveryType === 'pickup'
    ? Number(order.payAmount || 0) * 0.05
    : 2;

  if (isDbEnabled()) {
    const result = await query(
      'INSERT INTO agent_commission (agent_id, order_id, order_no, amount, status) VALUES (?, ?, ?, ?, ?)',
      [Number(order.agentId || 1), Number(order.id), order.orderNo, Number(amount.toFixed(2)), 'pending']
    );
    return {
      id: result.insertId,
      agentId: Number(order.agentId || 1),
      orderId: order.id,
      orderNo: order.orderNo,
      amount: Number(amount.toFixed(2)),
      status: 'pending'
    };
  }

  const record = {
    id: Date.now(),
    agentId: Number(order.agentId || 1),
    orderId: order.id,
    orderNo: order.orderNo,
    amount: Number(amount.toFixed(2)),
    status: 'pending'
  };
  mockRecords.unshift(record);
  return record;
}

async function list() {
  if (isDbEnabled()) {
    const rows = await query('SELECT id, agent_id, order_id, order_no, amount, status, created_at FROM agent_commission ORDER BY id DESC');
    return rows.map(row => ({
      id: row.id,
      agentId: row.agent_id,
      orderId: row.order_id,
      orderNo: row.order_no,
      amount: Number(row.amount || 0),
      status: row.status,
      createdAt: row.created_at
    }));
  }
  return mockRecords;
}

module.exports = {
  createForOrder,
  list
};
