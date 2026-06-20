const labels = {
  pending_confirm: '待确认',
  pending_accept: '待接单',
  accepted: '已接单',
  preparing: '备货中',
  delivering: '配送中',
  waiting_pickup: '待自提',
  completed: '已完成',
  closed: '已关闭'
};

const nextMap = {
  pending_confirm: ['pending_accept', 'closed'],
  pending_accept: ['accepted', 'closed'],
  accepted: ['preparing', 'delivering', 'waiting_pickup'],
  preparing: ['delivering', 'waiting_pickup'],
  delivering: ['completed'],
  waiting_pickup: ['completed'],
  completed: ['closed'],
  closed: []
};

function canChange(fromValue, toValue) {
  return (nextMap[fromValue] || []).includes(toValue);
}

function getLabel(value) {
  return labels[value] || value;
}

module.exports = {
  canChange,
  getLabel,
  nextMap
};
