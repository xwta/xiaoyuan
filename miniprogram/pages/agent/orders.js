const { request } = require('../../utils/request');

Page({
  data: {
    orders: [],
    loading: false
  },

  onShow() {
    this.loadOrders();
  },

  async loadOrders() {
    this.setData({ loading: true });
    try {
      const orders = await request({ url: '/agent/orders' });
      this.setData({
        orders: orders.map(order => ({
          ...order,
          payAmount: Number(order.payAmount || 0).toFixed(2)
        }))
      });
    } catch (error) {
      console.error('load agent orders failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goDetail(event) {
    wx.navigateTo({
      url: `/pages/agent/detail?id=${event.currentTarget.dataset.id}`
    });
  },

  async acceptOrder(event) {
    const orderId = event.currentTarget.dataset.id;
    try {
      await request({ url: `/agent/orders/${orderId}/accept`, method: 'POST' });
      wx.showToast({ title: '已接单', icon: 'success' });
      this.loadOrders();
    } catch (error) {
      console.error('accept order failed:', error);
    }
  },

  async completeOrder(event) {
    const orderId = event.currentTarget.dataset.id;
    try {
      await request({ url: `/agent/orders/${orderId}/delivered`, method: 'POST' });
      wx.showToast({ title: '订单完成', icon: 'success' });
      this.loadOrders();
    } catch (error) {
      console.error('complete order failed:', error);
    }
  }
});
