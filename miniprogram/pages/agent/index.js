Page({
  data: {
    summary: {
      todayOrders: 12,
      todaySales: '268.50',
      todayCommission: '31.20'
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
