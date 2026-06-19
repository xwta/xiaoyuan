const categories = [
  { id: 1, name: '饮料水饮' },
  { id: 2, name: '泡面速食' },
  { id: 3, name: '薯片零食' },
  { id: 4, name: '宿舍日用' }
];

const products = [
  { id: 1, categoryId: 1, name: '可乐 500ml', price: 3.0, count: 100, tags: ['冰饮', '热卖'] },
  { id: 2, categoryId: 1, name: '矿泉水', price: 2.0, count: 200, tags: ['寝室必备'] },
  { id: 3, categoryId: 2, name: '桶装泡面', price: 5.5, count: 80, tags: ['夜宵'] },
  { id: 4, categoryId: 3, name: '薯片', price: 6.9, count: 60, tags: ['聚会'] },
  { id: 5, categoryId: 4, name: '抽纸', price: 4.9, count: 120, tags: ['刚需'] }
];

const campuses = [{ id: 1, name: '第一校区' }];

const buildings = [
  { id: 1, campusId: 1, name: '6号楼' },
  { id: 2, campusId: 1, name: '8号楼' }
];

const agents = [
  { id: 1, campusId: 1, buildingId: 1, name: '6号楼校园代理点', pickupAddress: '6号楼一楼大厅旁', status: 'open' }
];

const orders = [
  {
    id: 1,
    orderNo: 'SN202606190001',
    status: 'pending_accept',
    statusText: '待接单',
    deliveryType: 'dormitory',
    deliveryText: '送到寝室',
    buildingName: '6号楼',
    roomNo: '602',
    contactName: '张同学',
    phone: '13800000000',
    productAmount: 16.5,
    deliveryFee: 2,
    payAmount: 18.5,
    pickupCode: '888888',
    items: [
      { productId: 1, name: '可乐 500ml', quantity: 2, price: 3, totalAmount: 6 },
      { productId: 3, name: '桶装泡面', quantity: 1, price: 5.5, totalAmount: 5.5 }
    ]
  }
];

const agentGoods = [
  { id: 1, agentId: 1, productId: 1, name: '可乐 500ml', categoryName: '饮料水饮', count: 24, warningCount: 10, statusText: '正常' },
  { id: 2, agentId: 1, productId: 3, name: '桶装泡面', categoryName: '泡面速食', count: 6, warningCount: 10, statusText: '需补货' },
  { id: 3, agentId: 1, productId: 5, name: '抽纸', categoryName: '宿舍日用', count: 18, warningCount: 8, statusText: '正常' }
];

const commissionRecords = [
  { id: 1, agentId: 1, orderNo: 'SN202606190001', typeText: '送寝订单', amount: 2.0, createdAt: '2026-06-19 22:10' },
  { id: 2, agentId: 1, orderNo: 'SN202606190002', typeText: '自提订单', amount: 1.2, createdAt: '2026-06-19 21:45' }
];

module.exports = {
  categories,
  products,
  campuses,
  buildings,
  agents,
  orders,
  agentGoods,
  commissionRecords
};
