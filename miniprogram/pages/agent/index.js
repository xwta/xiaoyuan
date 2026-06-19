const { request } = require('../../utils/request');

Page({
  data: {
    summary: {
      todayOrders: 0,
      todaySales: '0.00',
      todayCommission: '0.00'
    },
    loading: false
  },

  onShow() {
    this.loadSummary();
  },

  async loadSummary() {
    this.setData({ loading: true });
    try {
      const summary = await request({ url: '/agent/summary' });
      this.setData({
        summary: {
          ...summary,
          todaySales: Number(summary.todaySales || 0).toFixed(2),
          todayCommission: Number(summary.todayCommission || 0).toFixed(2)
        }
      });
    } catch (error) {
      console.error('load agent summary failed:', error);
    } finally {
      this.setData({ loading: false });
    }
  },

  goOrders() {
    wx.navigateTo({ url: '/pages/agent/orders' });
  },

  goVerify() {
    wx.navigateTo({ url: '/pages/agent/verify' });
  },

  goStock() {
    wx.navigateTo({ url: '/pages/agent/stock' });
  },

  goCommission() {
    wx.navigateTo({ url: '/pages/agent/commission' });
  }
});
