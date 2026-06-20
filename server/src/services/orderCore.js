const orderRepository = require('../repositories/orderRepository');
const { canChange, getLabel } = require('../utils/orderFlow');

async function createOrder(data) {
  return orderRepository.createOrder(data);
}

async function listOrders(filters = {}) {
  return orderRepository.listOrders(filters);
}

async function getOrder(id) {
  return orderRepository.getOrderById(id);
}

async function changeOrder(id, nextValue) {
  const order = await getOrder(id);
  if (!order) return null;
  const currentValue = order.status || 'pending_confirm';
  if (!canChange(currentValue, nextValue) && currentValue !== nextValue) {
    return null;
  }
  return orderRepository.updateOrderStatus(id, nextValue, getLabel(nextValue));
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  changeOrder
};
