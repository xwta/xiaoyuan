const { request } = require('../../utils/request');

Page({
  data: {
    activeStatus: 'all',
    tabs: [
      { label: '全部', value: 'all' },
      { label: '待支付', value: 'pending_pay' },
      { label: '待接单', value: 'pending_accept' },
      { label: '配送中', value: 'delivering' },
      { label: '待自提', value: 'waiting_pickup' },
      { label: '已完成', value: 'completed' }
    ],
    allOrders: [],
    orders: [],
    loading: false
  },

  onShow() {
    this.loadOrders();
  },

  async loadOrders() {
    this.setData({ loading: true });
    try {
      const orders = await request({ url: '/orders' });
      const formattedOrders = orders.map(order => ({
        ...order,
        productSummary: order.items && order.items.length
          ? order.items.map(item => item.name || `商品${item.productId}`).join('、')
          : '订单商品',
        addressText: order.deliveryType === 'pickup'
          ? '代理点自提'
          : `${order.buildingName || ''} ${order.roomNo || ''}`,
        quantity: order.items
          ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
          : 0,
        payAmount: Number(order.payAmount || 0).toFixed(2)
      }));

      this.setData({ allOrders: formattedOrders });
      this.filterOrders(this.data.activeStatus);
    } catch (error) {
      console.error('load orders failed:', error);
    } finally {
      this.setData({ loading: false });
    }
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
