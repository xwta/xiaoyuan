Page({
  data: {
    activeStatus: 'all',
    tabs: [
      { label: '全部', value: 'all' },
      { label: '待接单', value: 'pending_accept' },
      { label: '配送中', value: 'delivering' },
      { label: '待自提', value: 'waiting_pickup' },
      { label: '已完成', value: 'completed' }
    ],
    allOrders: [
      {
        id: 1,
        orderNo: 'SN202606190001',
        status: 'pending_accept',
        statusText: '待接单',
        productSummary: '可乐 500ml、桶装泡面',
        deliveryText: '送到寝室',
        addressText: '6号楼 602',
        quantity: 3,
        payAmount: '11.50'
      },
      {
        id: 2,
        orderNo: 'SN202606190002',
        status: 'waiting_pickup',
        statusText: '待自提',
        productSummary: '薯片、矿泉水',
        deliveryText: '代理点自提',
        addressText: '6号楼代理点',
        quantity: 2,
        payAmount: '8.90'
      }
    ],
    orders: []
  },

  onLoad() {
    this.filterOrders('all');
  },

  changeStatus(event) {
    const status = event.currentTarget.dataset.value;
    this.setData({ activeStatus: status });
    this.filterOrders(status);
  },

  filterOrders(status) {
    const orders = status === 'all'
      ? this.data.allOrders
      : this.data.allOrders.filter(item => item.status === status);
    this.setData({ orders });
  },

  goDetail(event) {
    wx.navigateTo({
      url: `/pages/order/detail?id=${event.currentTarget.dataset.id}`
    });
  }
});
